import React from "react";
import FileUploader from "../components/fileUploader";
import Input from "../components/Input"
import { saveProduct, uploadImages, listarCategorias, listarMarcas, createNewBrand, createNewCategory } from "../services/serverRequests";
import InputSelect from "../components/InputSelect";
import { BtnBack, BtnSave } from "../components/Button";
import Loader from "../components/Loader";
import Modal from "../components/Modal";

export default class NovoProduto extends React.Component {

    state = {
        produtoDetalhes: {},
        formDataImages: null,
        hasError: true,
        imageLimit: false,
        categoryOptions: undefined,
        isCategoryLoaded: false,
        isBrandLoaded: false,
        brandOptions: undefined,
        textNew: undefined,
        showModalAdd: false,
        isLoading: false,
        modalContent: undefined,
        modalReff: null,

    }

    constructor(props) {
        super(props);
        this.handlerOnInputChange = this.handlerOnInputChange.bind(this);
        this.setImage = this.setImage.bind(this);
        this.isImageLimited = this.isImageLimited.bind(this)
        this.handlerOnInputSelectChange = this.handlerOnInputSelectChange.bind(this);
        this.handlerOnShowsModal = this.handlerOnShowsModal.bind(this);
        this.getCategory();
        this.getBrand();
        this.salvarProduto = this.salvarProduto.bind(this);
        this.closeModalFn = this.closeModalFn.bind(this);
        this.handlerSaveModal = this.handlerSaveModal.bind(this);
        this.handlerOnIputModalChange = this.handlerOnIputModalChange.bind(this)
    }

    async getBrand() {
        let ret = await listarMarcas();
        this.setState({
            ...this.state,
            brandOptions: ret.data,
            isBrandLoaded: true
        })

        return ret
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

    handlerOnShowsModal(reff, conditionModal, reffState) {
        let ref = reff || this.state.textNew;
        this.setState({
            textNew: `Nova ${ref}`,
            showModalAdd: conditionModal,
            modalReff: reffState

        });
        let { textNew, showModalAdd } = this.state;
        return {textNew, showModalAdd}
    }

    isImageLimited(condition) {
        this.setState({
            ...this.state,
            imageLimit: condition
        })
    }

    handlerOnInputChange(pars) {
        console.log(pars)
        let { produtoDetalhes } = this.state;
        let ret = {}
        ret.name = pars.key === "name" ? pars.value : produtoDetalhes.name;
        ret.price = pars.key === "price" ? pars.value : produtoDetalhes.price;
        // ret.category = pars.key === "category" ? pars.value : produtoDetalhes.category;
        // ret.brand = pars.key === "marca" ? pars.value : produtoDetalhes.brand;
        ret.description = pars.key === "description" ? pars.value : produtoDetalhes.description;
        ret.width = pars.key === "width" ? pars.value : produtoDetalhes.width;
        ret.height = pars.key === "height" ? pars.value : produtoDetalhes.height;
        ret.weight = pars.key === "weight" ? pars.value : produtoDetalhes.weight;
        ret.length = pars.key === "length" ? pars.value : produtoDetalhes.length;

        this.setState({
            ...this.state,
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
                modalReff: reff,
                produtoDetalhes: {
                    ...this.state.produtoDetalhes,
                    category: e.target.value
                }
            })

        } else if (reff === "brand") {
            this.setState({
                ...this.state,
                produtoDetalhes: {
                    ...this.state.produtoDetalhes,
                    brand: e.target.value
                }
            })

        }


    }


    async salvarProduto() {
        this.state.produtoDetalhes.category = this.state.produtoDetalhes.category || 1;
        this.state.produtoDetalhes.brand = this.state.produtoDetalhes.brand || 1;
        let containError = false;

        if (this.state.formDataImages === null) {
            containError = true;
            return
        } else {
            const upImages = await uploadImages(this.state.formDataImages);


            let produtosConfig = {
                name: this.state.produtoDetalhes.name || "",
                price: this.state.produtoDetalhes.price,
                category: this.state.produtoDetalhes.category || "",
                brand: this.state.produtoDetalhes.brand || "",
                description: this.state.produtoDetalhes.description || "",
                width: this.state.produtoDetalhes.width || "",
                height: this.state.produtoDetalhes.height || "",
                weight: this.state.produtoDetalhes.weight || "",
                length: this.state.produtoDetalhes.length || "",
                image: JSON.stringify(upImages.data)
            }

            let produtosAutenticar = Object.values(produtosConfig);
            produtosAutenticar.map(
                e => e === "" ? containError = true : console.log(e)
            )

            this.setState({ hasError: containError })


            let ret = await saveProduct(produtosConfig);
            console.log(ret)
            if (ret.status === 200 && !this.state.hasError) {
                setTimeout(function () {
                    window.location = "/admin/produtos"
                }, 500)
            }

        }


    }

    setImage(formData) {
        this.setState({
            ...this.state,
            formDataImages: formData
        });
    }

    closeModalFn() {
        this.setState({
            ...this.state,
            showModalAdd: false
        })
    }

    async handlerSaveModal() {
        if (this.state.modalReff === "brand") {
            const ret = await createNewBrand(this.state.modalContent);
            const retBrand = await this.getBrand();
            console.log(retBrand)
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

    handlerOnIputModalChange(text) {
        console.log(text.target.value)
        this.setState({
            ...this.state,
            modalContent: text.target.value
        })
    }




    render() {
        let { hasError, imageLimit } = this.state;
        const alertSucess = <div className="alert alert-success text-center alertSuccess w-50 mx-auto">
            Produto salvo com sucesso
        </div>;

        const alertError = <div className="alert alert-danger text-center w-50 mx-auto">
            Preencha todos os campos para salvar.
        </div>;

        const alertWarning = <div className="alert alert-danger text-center w-50 mx-auto">
            Somente 3 imagens são permitidas.
        </div>;

        // const modalAdd = <div className="w-100 h-100 position-fixed align-center m-0 p-0 modal-new">

        //     <div className=' w-50' style={{ marginLeft: "15%", marginTop: "200px", height: "200px", borderRadius: "10px", backgroundColor: 'rgba(255,255,255)', boxShadow: "3px 3px 13px black" }}>
        //         <h3 className="text-center pt-3 text-primary"> {this.state.textNew}</h3>
        //         <input type="text" className="w-75 my-3 text-primary form-control" style={{ marginLeft: "calc(50% - 240px)" }} onChange={e => this.handlerOnIputModalChange(e)} />
        //         <BtnSaveModal saveFn={this.handlerSaveModal} contentModal={this.state.modalContent} />
        //         <BtnCloseModal closeFn={() => this.closeModalFn} />
        //     </div>
        // </div>

        const modalAdd = <Modal textNew={this.state.textNew} onChange={this.handlerOnIputModalChange} contentModal={this.state.modalContent} saveFn={this.handlerSaveModal} closeModalFn={this.closeModalFn} />


        return (
            <div className="container-fluid align-center m-0 p-0" style={{ marginTop: '50px' }} onClick={() => this.removeBackgroundNew}>
                {this.state.showModalAdd ? modalAdd : ''}
                <div className="form-group w-50 pl-1 m-4">

                    <Input reff="name" name="Nome" placeholder="Insira o nome" icon="file-signature" onChange={this.handlerOnInputChange} valueInput={this.state.produtoDetalhes.name} typeInput="text" />
                    <Input reff="price" name="Preço" placeholder="Insira o preço" icon="dollar-sign" onChange={this.handlerOnInputChange} valueInput={this.state.produtoDetalhes.price} typeInput="number" />
                    <InputSelect options={this.state.categoryOptions} inputName="Categorias" iconArea="align-center" onChange={this.handlerOnInputSelectChange} reff="category" isOptionsLoaded={this.state.isCategoryLoaded} handlerOnAddClicked={this.handlerOnShowsModal} />
                    <InputSelect options={this.state.brandOptions} inputName="Marcas" iconArea="align-center" onChange={this.handlerOnInputSelectChange} reff="brand" isOptionsLoaded={this.state.isBrandLoaded} handlerOnAddClicked={this.handlerOnShowsModal} />
                    <Input reff="description" name="Descrição" placeholder="Insira a descrição" icon="exclamation" onChange={this.handlerOnInputChange} valueInput={this.state.produtoDetalhes.description} typeInput="text" />
                    <Input reff="width" name="Largura (cm)" placeholder="Insira a descrição" icon="exclamation" onChange={this.handlerOnInputChange} valueInput={this.state.produtoDetalhes.width} typeInput="number" />
                    <Input reff="height" name="Altura (cm)" placeholder="Insira a descrição" icon="exclamation" onChange={this.handlerOnInputChange} valueInput={this.state.produtoDetalhes.height} typeInput="number" />
                    <Input reff="length" name="Comprimento (cm)" placeholder="Insira a descrição" icon="exclamation" onChange={this.handlerOnInputChange} valueInput={this.state.produtoDetalhes.length} typeInput="number" />
                    <Input reff="weight" name="Peso (gr)" placeholder="Insira a descrição" icon="exclamation" onChange={this.handlerOnInputChange} valueInput={this.state.produtoDetalhes.weight} typeInput="number" />
                </div>

                <div className="form-group ml-4">
                    <div className="form-group ml-2">
                        <label htmlFor="image" className="text-primary">Adicionar novas imagens</label>
                        <div>
                            {/* <input type="file" className="file-path validate btn btn-primary" id="image" /> */}
                            <FileUploader setImage={this.setImage} verifyImageLength={this.isImageLimited} />
                        </div>
                    </div>
                    {imageLimit ? alertWarning : ""}
                    {hasError ? alertError : alertSucess}
                    <div className="form-group d-flex justify-content-between p-0">
                        <BtnBack route="/admin/produtos" />
                        <BtnSave saveFn={this.salvarProduto} />

                    </div>
                </div>
                {this.state.isLoading ? <Loader /> : ""}
            </div>
        )
    }
}
