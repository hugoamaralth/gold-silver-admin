import React from "react";
// import { withRouter } from "react-router";
import { produtoPorId, updateProduct, uploadImages, deletarProduto, listarCategorias, listarMarcas, createNewBrand, createNewCategory } from "../services/serverRequests";
import Input from "../components/Input";
import Images from "../components/Images";
import InputSelect from "../components/InputSelect";
import { BtnBack, BtnDelete, BtnSave } from "../components/Button";
import Modal from "../components/Modal"
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
        showDeleteMessage: false,
        categoryOptions: undefined,
        isCategoryLoaded: false,
        brandOptions: undefined,
        isBrandLoaded: false,
        showModalAdd: false,
        isLoading: false,
        images: []

    }

    images = [];

    constructor(props) {
        super(props);
        this.getData();
        this.getBrand();
        this.getCategory();
        this.addImages = this.addImages.bind(this);
        this.handlerOnInputChange = this.handlerOnInputChange.bind(this);
        this.removeImages = this.removeImages.bind(this);
        this.getBrand = this.getBrand.bind(this);
        this.getCategory = this.getCategory.bind(this);
        this.handlerOnInputSelectChange = this.handlerOnInputSelectChange.bind(this);
        this.handlerOnShowsModal = this.handlerOnShowsModal.bind(this)
        this.handlerOnIputModalChange = this.handlerOnIputModalChange.bind(this);
        this.handlerSaveModal = this.handlerSaveModal.bind(this);
        this.closeModalFn = this.closeModalFn.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.salvarProduto = this.salvarProduto.bind(this);
    }

    async getBrand() {
        let ret = await listarMarcas();
        this.setState({
            ...this.state,
            brandOptions: ret.data,
            isBrandLoaded: true
        })
        return ret;
    }

    async getCategory() {
        let ret = await listarCategorias();
        this.setState({
            ...this.state,
            categoryOptions: ret.data,
            isCategoryLoaded: true
        })
        return ret
    }


    closeModalFn() {
        this.setState({
            ...this.state,
            showModalAdd: false
        })
    }

    removeImages(e, imageIndice) {
        e.preventDefault()
        let { image } = this.state.produtoDetalhes;
        // let image = this.image;
        image.splice(imageIndice, 1);
        console.log(this.state.produtoDetalhes.image)
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


    async getData() {

        let detalhesResp = {};
        await produtoPorId(this.id).then(
            resp => {
                detalhesResp = resp[0];
                this.setState({
                    ...this.state,
                    produtoDetalhes: detalhesResp,
                    isImagesLoaded: true,
                });
                detalhesResp.image.map(img =>
                    this.images.push({
                        name: img,
                        uploaded: true
                    })
                );
                return "";
            }
        );
    };


    getImageByName(name) {
        return this.images.filter(img => img.name === name)[0];
    }

    async salvarProduto() {
    
        let containsError = undefined;

        const produtosConfig = {
            name: this.state.produtoDetalhes.name,
            price: this.state.produtoDetalhes.price,
            category: this.state.produtoDetalhes.category_id,
            brand: this.state.produtoDetalhes.brand_id,
            description: this.state.produtoDetalhes.description,
            width: this.state.produtoDetalhes.width,
            height: this.state.produtoDetalhes.height,
            weight: this.state.produtoDetalhes.weight,
            length: this.state.produtoDetalhes.length,
        };

        console.log(this.images)
        let produtosAutenticar = Object.values(produtosConfig);
        produtosAutenticar.map(
            e => e === "" || this.state.produtoDetalhes.image.length === 0 ? containsError = true : ""
        );


        this.setState({ hasError: containsError });

        if (!this.state.hasError) {
            let formData = new FormData();
            let hasUploadsTodo = false;
            let arrayImages = [];
            this.state.produtoDetalhes.image.map(img => {
                let name = img.includes("blob:") ? img.split("/")[img.split("/").length - 1] : img;
                let image = this.getImageByName(name);
                if (image.uploaded) {
                    arrayImages.push(img);
                } else {
                    hasUploadsTodo = true;
                    formData.append("files[]", image.formData);
                }
            });
            if (hasUploadsTodo) {
                const upImages = await uploadImages(formData);
                arrayImages = [
                    ...arrayImages,
                    ...upImages.data
                ];
            }
            produtosConfig.image = JSON.stringify(arrayImages);
            let ret = await updateProduct(this.id, produtosConfig);
            if (ret.status === 200 && !this.state.hasError) {
                setTimeout(function () {
                    window.location = "/admin/produtos";
                }, 500)
            }
            console.log(ret)
            
        }
    }

    handlerOnInputChange(pars) {
        let { produtoDetalhes } = this.state;
        let ret = {}
        ret.name = pars.key === "name" ? pars.value : produtoDetalhes.name;
        ret.price = pars.key === "price" ? pars.value : produtoDetalhes.price;
        ret.description = pars.key === "description" ? pars.value : produtoDetalhes.description;
        ret.width = pars.key === "width" ? pars.value : produtoDetalhes.width;
        ret.height = pars.key === "height" ? pars.value : produtoDetalhes.height;
        ret.weight = pars.key === "weight" ? pars.value : produtoDetalhes.weight;
        ret.length = pars.key === "length" ? pars.value : produtoDetalhes.length;

        this.setState({
            produtoDetalhes: {
                ...this.state.produtoDetalhes,
                ...ret
            }
        })
    }

    handlerOnInputSelectChange(e, reff) {
        e.persist();
        if (reff === "category") {
            this.setState({
                ...this.state,
                produtoDetalhes: {
                    ...this.state.produtoDetalhes,
                    category: e.target.value,
                    category_id: e.target.value
                }
            })

        } else if (reff === "brand") {
            this.setState({
                ...this.state,
                produtoDetalhes: {
                    ...this.state.produtoDetalhes,
                    brand: e.target.value,
                    brand_id: e.target.value

                }
            })

        }


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

    async deleteProduct(id) {
        let ret = await deletarProduto(id);
        if (ret.status === 200) {
            this.setState({
                showDeleteMessage: true
            })
            setTimeout(() =>
                window.location = "/admin/produtos"
                , 1500)
        }
    }

    handlerOnShowsModal(reff, conditionModal, reffState) {
        let ref = reff || this.state.textNew;
        this.setState({
            textNew: `Nova ${ref}`,
            showModalAdd: conditionModal,
            modalReff: reffState

        });
        let { textNew, showModalAdd } = this.state;
        return textNew, showModalAdd
    }

    isImageLimited(condition) {
        this.setState({
            ...this.state,
            imageLimit: condition
        })
    }


    handlerOnIputModalChange(text) {
        this.setState({
            ...this.state,
            modalContent: text.target.value
        })
    }

    async handlerSaveModal() {
        if (this.state.modalReff === "brand") {
            const ret = await createNewBrand(this.state.modalContent);
            const retBrand = await this.getBrand();

            this.setState({
                ...this.state,
                isLoading: true
            })
            if (ret.status === 200) {
                if (retBrand.status === 200) {
                    this.setState({
                        ...this.state,
                        isLoading: false,
                        showModalAdd: false
                    })
                }
            }
        } else {
            const ret = await createNewCategory(this.state.modalContent);
            const retCategory = await this.getCategory();

            this.setState({
                ...this.state,
                isLoading: true
            })
            if (ret.status === 200) {
                if (retCategory.status === 200) {
                    this.setState({
                        ...this.state,
                        isLoading: false,
                        showModalAdd: false
                    })
                }
            }
        }
    }



    render() {

        let { hasError } = this.state;
        const alertSucess = <div className="alert alert-success text-center alertSuccess">
            Produto salvo com sucesso
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

        const modalAdd = <Modal closeModalFn={this.closeModalFn} textNew={this.state.textNew} onChange={this.handlerOnIputModalChange} contentModal={this.state.modalContent} saveFn={this.handlerSaveModal} closeModalFn={this.closeModalFn} />

        return (
            <div className="container-fluid m-0 p-0" >
                {this.state.showModalAdd ? modalAdd : ''}
                <div className="container produtosEditArea">
                    <form className="m-0 p-0">
                        <div className="form-group w-50 pl-1 m-4">
                            <Input reff="name" valueInput={this.state.produtoDetalhes.name} onChange={this.handlerOnInputChange} name="Nome" icon="file-signature" typeInput="text" />
                            <Input reff="price" valueInput={this.state.produtoDetalhes.price} onChange={this.handlerOnInputChange} name="Preço" icon="dollar-sign" typeInput="number" />
                            <InputSelect inputName="Categoria" reff="category" isEdit={this.state.produtoDetalhes.category_id} options={this.state.categoryOptions} isOptionsLoaded={this.state.isCategoryLoaded} onChange={this.handlerOnInputSelectChange} iconArea="align-center" handlerOnAddClicked={this.handlerOnShowsModal} />
                            <InputSelect inputName="Marca" reff="brand" isEdit={this.state.produtoDetalhes.brand_id} options={this.state.brandOptions} isOptionsLoaded={this.state.isBrandLoaded} onChange={this.handlerOnInputSelectChange} iconArea="address-book" handlerOnAddClicked={this.handlerOnShowsModal} />
                            <Input reff="description" valueInput={this.state.produtoDetalhes.description} onChange={this.handlerOnInputChange} name="Descrição" icon="exclamation" typeInput="text" />
                            <Input reff="width" valueInput={this.state.produtoDetalhes.width} onChange={this.handlerOnInputChange} name="Largura (cm)" icon="exclamation" typeInput="text" />
                            <Input reff="height" valueInput={this.state.produtoDetalhes.height} onChange={this.handlerOnInputChange} name="Altura (cm)" icon="exclamation" typeInput="text" />
                            <Input reff="weight" valueInput={this.state.produtoDetalhes.weight} onChange={this.handlerOnInputChange} name="Comprimento (cm)" icon="exclamation" typeInput="text" />
                            <Input reff="length" valueInput={this.state.produtoDetalhes.length} onChange={this.handlerOnInputChange} name="Peso (gr)" icon="exclamation" typeInput="text" />
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
                                <input type="file" className="file-path validate btn btn-primary" onChange={this.addImages} />
                            </div>
                        </div>

                        {this.state.showDeleteMessage ? alertDelete : ""}
                        {hasError ? alertError : alertSucess}
                        <div className="form-group d-flex justify-content-between p-0">
                            <BtnBack route="/admin/produtos/" />
                            <BtnDelete deleteFn={this.deleteProduct} idToDelete={this.id} />
                            <BtnSave saveFn={this.salvarProduto} />


                            {/* <div className=" p-2 btn " onClick={() => this.salvarProduto(this.id)}>
                                    <span className="btn btn-primary h-100 w-100 btn-icon-split">
                                        <span className="icon text-white-50">
                                            <i className="fas fa-check text-light"></i>
                                        </span>
                                        <span className="text text-light">Salvar</span>
                                    </span>
                                </div> */}
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}