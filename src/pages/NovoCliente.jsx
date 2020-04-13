import React, { Component } from "react";
import Input from "../components/Input"
import { saveCliente, getAddressByCep } from "../services/serverRequests";
import InputMask from "react-input-mask"
import { BtnBack, BtnSave } from "../components/Button";
export default class NovoCliente extends Component {
    state = {
        clienteDetalhes: {},
        hasError: true,
        isPasswordTheSame: undefined
    }
    constructor(props) {
        super(props);
        this.handlerOnInputChange = this.handlerOnInputChange.bind(this);
        this.salvarCliente = this.salvarCliente.bind(this);
        
    }

    async checkAndGetCep(e) {
        await this.setState({
            ...this.state,
            clienteDetalhes: {
                ...this.state.clienteDetalhes,
                cep: e.target.value
            }
        });
        if (this.state.clienteDetalhes.cep.length === 9) {
            this.setState({
                ...this.state,
                isLoading: true
            });
            const address = await getAddressByCep(this.state.clienteDetalhes.cep);
            this.setState({
                ...this.state,
                isLoading: false,
            });
            if (address.erro === true) {
                this.setState({
                    ...this.state,
                    msgUser: 'O cep digitado não é válido.',
                    clienteDetalhes: {
                        ...this.state.clienteDetalhes,
                        state: '',
                        city: '',
                        address: '',
                        district: '',
                        complement: ''
                    }
                });
            } else {
                this.setState({
                    ...this.state,
                    msgUser: '',
                    clienteDetalhes: {
                        ...this.state.clienteDetalhes,
                        state: address.uf,
                        city: address.localidade,
                        address: address.logradouro,
                        district: address.bairro,
                        complement: address.complemento,
                    }
                });
            }
        }
    }



    async salvarCliente() {
        let containError = false;

        let clienteConfig = {
            name: this.state.clienteDetalhes.nome || '',
            lastName: this.state.clienteDetalhes.sobrenome || '',
            email: this.state.clienteDetalhes.email || '',
            phone: this.state.clienteDetalhes.telefone || '',
            password: this.state.clienteDetalhes.senha || '',
            confirmPassword: this.state.clienteDetalhes.confirmarSenha || '',
            address: this.state.clienteDetalhes.address || '',
            city: this.state.clienteDetalhes.city || '',
            district: this.state.clienteDetalhes.district || '',
            number: this.state.clienteDetalhes.confirmarSenha || '',
            cep: this.state.clienteDetalhes.cep || '',
            num: this.state.clienteDetalhes.num || '',
            complement: this.state.clienteDetalhes.complement || '',
            state: this.state.clienteDetalhes.state || '',
        };
        let clienteValues = Object.values(clienteConfig);
        clienteValues.map(
            e => e === '' ? containError = true : console.log(e)
        )

        if (!containError) {
            let { clienteDetalhes } = this.state;
            let confirmPassword = clienteDetalhes.senha === clienteDetalhes.confirmarSenha;
            if (confirmPassword) {
                this.setState({
                    hasError: containError,
                    isPasswordTheSame: true
                });

                let save = await saveCliente(clienteConfig);

                if (save.status === 200) {
                    setTimeout(function () {
                        window.location = "/admin/clientes"
                    }, 1500)
                }
            } else {
                this.setState({
                    isPasswordTheSame: false
                })
            }
        }


    }

    handlerOnInputChange(pars) {
        let { clienteDetalhes } = this.state;
        let ret = {};
        console.log(pars)
        ret.nome = pars.key === "nome" ? pars.value : clienteDetalhes.nome;
        ret.sobrenome = pars.key === "sobrenome" ? pars.value : clienteDetalhes.sobrenome;
        ret.email = pars.key === "email" ? pars.value : clienteDetalhes.email;
        ret.senha = pars.key === "senha" ? pars.value : clienteDetalhes.senha;
        ret.confirmarSenha = pars.key === "confirmarSenha" ? pars.value : clienteDetalhes.confirmarSenha;
        ret.telefone = pars.key === "telefone" ? pars.value : clienteDetalhes.telefone;
        ret.city = pars.key === "city" ? pars.value : clienteDetalhes.city;
        ret.district = pars.key === "district" ? pars.value : clienteDetalhes.district;
        ret.complement = pars.key === "complement" ? pars.value : clienteDetalhes.complement;
        ret.num = pars.key === "num" ? pars.value : clienteDetalhes.num;
        ret.cep = pars.key === "cep" ? pars.value : clienteDetalhes.cep;
        ret.address = pars.key === "adress" ? pars.value : clienteDetalhes.address;

        console.log(ret.complement)
        this.setState({
            ...this.state,
            clienteDetalhes: {
                ...this.state.clienteDetalhes,
                ...ret
            }
        })
        console.log(clienteDetalhes)

    }

    render() {
        
        const alertSuccess = <div className="alert alert-success alertSuccess text-center">
            Cliente salvo com sucesso.
        </div>

        const alertError = <div className="alert alert-danger alertError text-center">
            Preencha todos os campos para continuar.
        </div>

        const checkPassword = <div className="alert alert-danger text-center">
            As senhas não são a mesma.
        </div>

        return (
            <div className="container-fluid ">
                <form action="" className="my-5">
                    <div className="form-group">
                        <Input reff="nome" name="Nome" placeholder="Insira o nome do cliente" icon="id-card" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.nome} />
                        <Input reff="sobrenome" name="Sobrenome" placeholder="Insira o sobrenome do cliente" icon="signature" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.sobrenome} />
                        <Input reff="email" name="Email" placeholder="Insira o email do cliente" icon="envelope" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.email} />
                        <Input reff="senha" name="Senha" placeholder="Insira a senha do cliente" icon="key" typeInput="password" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.senha} />
                        <Input reff="confirmarSenha" name="Confirmar Senha" placeholder="Confirme a senha do cliente" icon="lock" typeInput="password" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.confirmarSenha} />
                        <div className="input-group my-3">
                            <label htmlFor="" className="text-primary w-100"> Celular </label>
                            <div className="input-group-prepend ">
                                <label className="input-group-text rounded-left" htmor="selectCategory"> <i className={`fas fa-phone text-primary`}></i></label>
                            </div>
                            <InputMask mask="(99) 99999-9999" maskChar="" onChange={e => this.handlerOnInputChange({key: 'telefone', value:e.target.value}) } reff="num" value={this.state.clienteDetalhes.telefone} className="form-control" placeholder='Insira o número de celular do cliente ' />
                        </div>

                        <div className="input-group my-3">
                            <label htmlFor="" className="text-primary w-100"> CEP</label>
                            <div className="input-group-prepend ">
                                <label className="input-group-text rounded-left" htmor="selectCategory"> <i className={`fas fa-map-marker-alt text-primary`}></i></label>
                            </div>
                            <InputMask mask="99999-999" maskChar="" onChange={e => { this.checkAndGetCep(e) }} value={this.state.clienteDetalhes.cep} className="form-control" placeholder='Insira o CEP do cliente '  />
                        </div>
                        
                        <Input readOnly reff="city" name="Cidade" placeholder="Insira a cidade do cliente" icon="city" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.city} />
                        {/* <Input readOnly reff="cep" name="Cidade" placeholder="Insira o CEP do cliente" icon="cep" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.city} /> */}
                        <Input readOnly reff="district" name="Bairro" placeholder="Insira bairro do cliente" icon="globe-americas" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.district} />
                        <Input readOnly reff="address" name="Logradouro" placeholder="Insira o logradouro do cliente" icon="road" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.address} />
                        <Input reff="num" name="Numero" placeholder="Insira o numero da casa do cliente" icon="home" typeInput="number" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.num} />
                        <Input reff="complement" name="Complemento" placeholder="Insira o complemento da casa do cliente" icon="building" typeInput="text" onChange={this.handlerOnInputChange} valueInput={this.state.clienteDetalhes.complement} />
                    </div>

                    {this.state.hasError ? alertError : alertSuccess}
                    {this.state.isPasswordTheSame ? "" : checkPassword}
                    <div className="form-group">


                        <div className="form-group d-flex justify-content-between p-0">
                        <BtnBack route="/admin/clientes"/>
                        <BtnSave saveFn={this.salvarCliente}/>
                            {/* <div className=" p-2 btn " onClick={() => this.salvarCliente()}>
                                <span className="btn btn-primary h-100 w-100 btn-icon-split">
                                    <span className="icon text-white-50">
                                        <i className="fas fa-check text-light"></i>
                                    </span>
                                    <span className="text text-light">Salvar</span>
                                </span>
                            </div> */}

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
