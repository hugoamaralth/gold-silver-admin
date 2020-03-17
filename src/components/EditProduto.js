import React from "react";
// import { withRouter } from "react-router";
import { produtoPorId, updateProduct, uploadImages, deletarProduto } from "../services/serverRequests";
import Input from "./Input";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Images from "./Images";
// import fileUploader from "./fileUploader";

export default class Edit extends React.Component {

    url = "http://192.168.1.7:3000/";
    id = this.props.match.params.id;

    state = {
        produtoDetalhes: {
            name: ''
        },
        hasError: false,
        isImagesLoaded: false,
        imageLimit: false,
        showDeleteMessage: false
    }

    images = [];

    constructor(props) {
        super(props);
        this.getData();
        this.addImages = this.addImages.bind(this);
        this.handlerOnInputChange = this.handlerOnInputChange.bind(this);
        this.removeImages = this.removeImages.bind(this)
        //console.log(this.state.objetoSalvar)

    }

    removeImages(e, imageIndice) {
        e.preventDefault()
        let { image } = this.state.produtoDetalhes;
        image.splice(imageIndice, 1);
        this.setState({
            ...this.state,
            produtoDetalhes: {
                ...this.state.produtoDetalhes,
                image
            }
        })
    }

    listarImagens() {
        let { image } = this.state.produtoDetalhes;
        let ret = []
        image.map(
            (e, i) => ret.push(
                <Images imagemNome={e} key={i} imageStyle={{ width: '180px', marginLeft: "10px" }} removeImage={this.removeImages} indice={i} />
            )
        )

        return ret;
    }


    getData() {

        let detalhesResp = {};
        produtoPorId(this.id).then(
            resp => {
                detalhesResp = resp[0];
                this.setState({ produtoDetalhes: detalhesResp })
                this.setState({
                    ...this.state,
                    produtoDetalhes: {
                        ...this.state.produtoDetalhes            
                    },
                    isImagesLoaded: true,
                });
                detalhesResp.image.map(img => {
                    return this.images.push({
                        name: img,
                        uploaded: true
                    })
                });
            }
        );
    };


    getImageByName(name){
        return this.images.filter(img => img.name === name)[0];
    }

    async salvarProduto() {
        let containsError = undefined;

        const produtosConfig = {
            name: this.state.produtoDetalhes.name,
            price: this.state.produtoDetalhes.price,
            category: this.state.produtoDetalhes.category,
            brand: this.state.produtoDetalhes.brand,
            description: this.state.produtoDetalhes.description
        };

        let produtosAutenticar = Object.values(produtosConfig);
        produtosAutenticar.map(
            e  => e === "" ? containsError = true : ""
        );


        this.setState({ hasError: containsError });

        if (!this.state.hasError) {
            let formData = new FormData();
            let hasUploadsTodo = false;
            let arrayImages = [];
            this.state.produtoDetalhes.image.map(img => {
                let name = img.includes("blob:") ? img.split("/")[img.split("/").length - 1] : img;
                let image = this.getImageByName(name);
                if(image.uploaded){
                    arrayImages.push(img);
                } else {
                    hasUploadsTodo = true;
                    formData.append("files[]", image.formData);
                }
            });
            if(hasUploadsTodo){
                const upImages = await uploadImages(formData);
                console.log(upImages)
                arrayImages = [
                    ...arrayImages,
                    ...upImages.data
                ];
            }
            produtosConfig.image = JSON.stringify(arrayImages);
            let ret = await updateProduct(this.id, produtosConfig);
            if(ret.status === 200 && !this.state.hasError){
                let alertSuccess = document.querySelector('.alertSuccess');
                alertSuccess.innerHTML= "Produto salvo com sucesso."

                setTimeout(function(){
                    window.location = "/admin/produtos"
                }, 1500)
            }
        }
    }

    handlerOnInputChange(pars) {
        let { produtoDetalhes } = this.state;
        let ret = {}
        ret.name = pars.key === "name" ? pars.value : produtoDetalhes.name;
        ret.price = pars.key === "price" ? pars.value : produtoDetalhes.price;
        ret.category = pars.key === "category" ? pars.value : produtoDetalhes.category;
        ret.brand = pars.key === "brand" ? pars.value : produtoDetalhes.brand;
        ret.description = pars.key === "description" ? pars.value : produtoDetalhes.description;

        this.setState({
            produtoDetalhes: {
                ...this.state.produtoDetalhes,
                ...ret
            }
        })
    }

    async addImages(e) {
        let imagesSelected = e.target.files;
        let name = URL.createObjectURL(imagesSelected[0]);
        this.images.push({
            name: name.split("/")[name.split("/").length - 1],
            uploaded: false,
            formData: imagesSelected[0]
        })       
        if (this.state.produtoDetalhes.image.length < 3) {
            await this.setState({
                ...this.state,
                produtoDetalhes: {
                    ...this.state.produtoDetalhes,
                    image: [
                        ...this.state.produtoDetalhes.image,
                        name
                    ]
                }
            })
        } else {
            this.setState({
                ...this.state,
                imageLimit: true
            })
        }
    }

    async deleteProduct(id){
        let ret = await deletarProduto(id);
        
        if(ret.status === 200){ 
            this.setState({
                showDeleteMessage: true
            })
            setTimeout(function(){
                window.location = "/admin/produtos";
            }, 1500)
        }
    }


    render() {

        let { hasError } = this.state;
        const alertSucess = <div className="alert alert-success text-center alertSuccess">
            Sem erros, produto pronto para ser salvo.
        </div>;

        const alertError = <div className="alert alert-danger text-center">
            Preencha todos os campos para salvar.
        </div>;

        const alertWarning = <div className="alert alert-danger text-center">
            Somente 3 imagens são permitidas.
        </div>

        const alertDelete = <div className="aler alert-danger text-center">
            Produto deletado com sucesso
        </div>
        return (
            <div className="container-fluid m-0 p-0 " >
                <div className="container my-5 produtosEditArea">
                    <form >
                        <div className="form-group">
                            <Input reff="name" valueInput={this.state.produtoDetalhes.name} onChange={this.handlerOnInputChange} name="Nome" icon="file-signature" typeInput="text" />
                            <Input reff="price" valueInput={this.state.produtoDetalhes.price} onChange={this.handlerOnInputChange} name="Preço" icon="dollar-sign" typeInput="number" />
                            <Input reff="category" valueInput={this.state.produtoDetalhes.category} onChange={this.handlerOnInputChange} name="Categoria" icon="align-center" typeInput="text" />
                            <Input reff="brand" valueInput={this.state.produtoDetalhes.brand} onChange={this.handlerOnInputChange} name="Brand" icon="copyright" typeInput="text" />
                            <Input reff="description" valueInput={this.state.produtoDetalhes.description} onChange={this.handlerOnInputChange} name="Descrição" icon="exclamation" typeInput="text" />
                        </div>
                        <div className="form-group ml-2">

                            <div className="form-group multi-preview d-flex">
                                {this.state.isImagesLoaded ? this.listarImagens() : ""}
                            </div>
                        </div>
                        {this.state.imageLimit ? alertWarning : ""}
                        <div className="form-group ml-2">
                            <label htmlFor="image" className="text-primary">Adicionar nova imagem</label>
                            <div>
                                <input type="file" className="file-path validate btn btn-primary"  onChange={this.addImages} />
                            </div>
                        </div>

                        {this.state.showDeleteMessage ? alertDelete : ""}
                        {hasError ? alertError : alertSucess}
                        <div className="form-group d-flex justify-content-between p-0">
                            <Link to="/admin/produtos/list" >
                                <div className="p-2 btn" >
                                    <span className="btn  btn-warning h-100 w-100 btn-icon-split">
                                        <span className="icon text-white-50">
                                            <i className="fas fa-long-arrow-alt-left text-light"></i>
                                        </span>
                                        <span className="text text-light">Voltar</span>
                                    </span>
                                </div>
                            </Link>
                            <div className=" p-2 btn mx-2"  onClick={()=> this.deleteProduct(this.id)}>
                                <span className="btn  btn-danger h-100 w-100 btn-icon-split">
                                    <span className="icon text-white-50">
                                        <i className="fas fa-trash text-light"></i>
                                    </span>
                                    <span className="text text-light">Excluir</span>
                                </span>
                            </div>
                            <div className=" p-2 btn "  onClick={() => this.salvarProduto(this.id)}>
                                <span className="btn btn-primary h-100 w-100 btn-icon-split">
                                    <span className="icon text-white-50">
                                        <i className="fas fa-check text-light"></i>
                                    </span>
                                    <span className="text text-light">Salvar</span>
                                </span>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}