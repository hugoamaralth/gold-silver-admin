import React, { Component} from "react";
import Input from "./Input"
export default class NovoCliente extends Component {
    state = {
        clienteDetalhes: {}
    }

    handlerOnInputChange(pars){
        let {clienteDetalhes} = this.state;
        let ret = {};

        ret.name = pars.key === "name" ? pars.value : clienteDetalhes.name;
        ret.sobrenome = pars.key === "sobrenome" ? pars.value : clienteDetalhes.price;
        ret.nascimento = pars.key === "nascimento" ? pars.value : clienteDetalhes.category;
        ret.cpf = pars.key === "cpf" ? pars.value : clienteDetalhes.marca;
        ret.email = pars.key === "email" ? pars.value : clienteDetalhes.description;
        ret.genero = pars.key === "genero" ? pars.value : clienteDetalhes.description;
                
        this.setState({
            ...this.state,
            clienteDetalhes : {
                ...this.state.clienteDetalhes,
                ...ret
            }
        })
    }
    
    render(){ 

        return (
            <div className="container-fluid ">
                <form action="" className="my-5">
                    <div className="form-group">
                        <Input reff="name" name="Nome" placeholder="Insira o nome do produto" icon="id-card"  typeInput="text" onChange={this.handlerOnInputChange} value={this.state.clientesDetalhes}/>
                        <Input reff="sobrenome" name="Sobrenome" placeholder="Insira o preço do produto" icon="signature"  typeInput="text"/>
                        <Input reff="nascimento" name="Data de Nascimento" placeholder="Insira a categoria do produto" icon="birthday-cake"  typeInput="text"/>
                        <Input reff="cpf" name="CPF" placeholder="Insira a marca do produto" icon="file-signature"  typeInput="text"/>
                        <Input reff="email" name="Email" placeholder="Insira descrição do produto" icon="envelope"  typeInput="text"/>
                        <Input reff="genero" name="Gênero" placeholder="Insira descrição do produto" icon="male"  typeInput="text"/>
                    </div>

                    <div className="form-group">
                        <div className="form-group d-flex justify-content-between p-0">
                            <div className="p-2 btn" id="salvar">
                                <span className="btn  btn-warning h-100 w-100 btn-icon-split">
                                    <span className="icon text-white-50">
                                        <i className="fas fa-long-arrow-alt-left text-light"></i>
                                    </span>
                                    <span className="text text-light">Voltar</span>
                                </span>
                            </div>
                            <div className=" p-2 btn " id="salvar" onClick={()=> this.salvarCliente()}>
                                <span className="btn btn-primary h-100 w-100 btn-icon-split">
                                    <span className="icon text-white-50">
                                        <i className="fas fa-check text-light"></i>
                                    </span>
                                    <span className="text text-light">Salvar</span>
                                </span>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
