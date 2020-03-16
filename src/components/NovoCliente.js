import React, { Component } from "react";
import Input from "./Input"
import { saveCliente } from "../services/serverRequests";
export default class NovoCliente extends Component {
    state = {
        clienteDetalhes: {},
        hasError: true
    }
    constructor(props) {
        super(props);
        this.handlerOnInputChange = this.handlerOnInputChange.bind(this);
        this.salvarCliente = this.salvarCliente.bind(this);

    }

    async salvarCliente() {
        let containError = false;

        let clienteConfig = {
            name: this.state.clienteDetalhes.nome || '',
            lastName: this.state.clienteDetalhes.sobrenome || '',
            email: this.state.clienteDetalhes.email || '',
            phone: this.state.clienteDetalhes.telefone || '',
            password: this.state.clienteDetalhes.senha || '',
        };
        let clienteValues = Object.values(clienteConfig);
        clienteValues.map(
            e => e === '' ? containError = true : console.log(e)
        )
        console.log(containError)

        this.setState({
            hasError: containError
        })

        if (!containError) {
            let save = await saveCliente(clienteConfig);
            if (save.status === 200) {
                setTimeout(function () {
                    window.location = "/admin/clientes"
                }, 1500)
            }
        } else {
            console.log("nao autorizado")
        }


    }

    handlerOnInputChange(pars) {
        let { clienteDetalhes } = this.state;
        let ret = {};
        ret.nome = pars.key === "nome" ? pars.value : clienteDetalhes.nome;
        ret.sobrenome = pars.key === "sobrenome" ? pars.value : clienteDetalhes.sobrenome;
        ret.nascimento = pars.key === "nascimento" ? pars.value : clienteDetalhes.nascimento;
        ret.cpf = pars.key === "cpf" ? pars.value : clienteDetalhes.cpf;
        ret.email = pars.key === "email" ? pars.value : clienteDetalhes.email;
        ret.genero = pars.key === "genero" ? pars.value : clienteDetalhes.genero;
        ret.senha = pars.key === "senha" ? pars.value : clienteDetalhes.senha;
        ret.telefone = pars.key === "telefone" ? pars.value : clienteDetalhes.telefone;

        this.setState({
            ...this.state,
            clienteDetalhes: {
                ...this.state.clienteDetalhes,
                ...ret
            }
        })
        // console.log(clienteDetalhes)
    }

    render() {
        const alertSuccess = <div className="alert alert-success alertSuccess text-center">
            Cliente salvo com sucesso.
        </div>

        const alertError = <div className="alert alert-danger alertError text-center">
            Preencha todos os campos para continuar.
        </div>

        
        return (
            <div className="container-fluid ">
                <form action="" className="my-5">
                    <div className="form-group">
                        <Input reff="nome" name="Nome" placeholder="Insira o nome do cliente" icon="id-card" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.nome} />
                        <Input reff="sobrenome" name="Sobrenome" placeholder="Insira o sobrenome do cliente" icon="signature" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.sobrenome} />
                        <Input reff="nascimento" name="Data de Nascimento" placeholder="Insira a data de nascimento do cliente" icon="birthday-cake" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.nascimento} />
                        <Input reff="cpf" name="CPF" placeholder="Insira o cpf do cliente" icon="file-signature" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.cpf} />
                        <Input reff="email" name="Email" placeholder="Insira o email do cliente" icon="envelope" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.email} />
                        <Input reff="genero" name="Gênero" placeholder="Insira o genero do cliente" icon="male" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.genero} />
                        <Input reff="senha" name="Senha" placeholder="Insira a senha do cliente" icon="key" typeInput="password" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.senha} />
                        <Input reff="telefone" name="Telefone" placeholder="Insira o telefone do cliente" icon="phone" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.telefone} />
                    </div>

                    {this.state.hasError ? alertError : alertSuccess}
                    <div className="form-group">

                        <div className="form-group d-flex justify-content-between p-0">
                            <div className="p-2 btn" onClick={()=> window.location = "/admin/clientes"}>
                                <span className="btn  btn-warning h-100 w-100 btn-icon-split">
                                    <span className="icon text-white-50">
                                        <i className="fas fa-long-arrow-alt-left text-light"></i>
                                    </span>
                                    <span className="text text-light">Voltar</span>
                                </span>
                            </div>
                            <div className=" p-2 btn " onClick={() => this.salvarCliente()}>
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
