import React from "react";
import Input from "../components/Input";
import { clientePorId, deletarCliente, getAddressByCep } from "../services/serverRequests";
import { BtnBack, BtnDelete } from "../components/Button";
export default class EditClientes extends React.Component {
    id = this.props.match.params.id;
    state = {
        clienteDetalhes: {},
        clienteDeletado: false
    }

    constructor(props) {
        super(props);
        this.getData();
        this.deleteCliente = this.deleteCliente.bind(this)
    }

    async getData() {
        let ret = {};
        let detalhesResp = await clientePorId(this.id).then(cliente => cliente[0]);
        ret.name = detalhesResp.name;
        ret.lastname = detalhesResp.lastName;
        ret.email = detalhesResp.email;
        ret.phone = detalhesResp.phone;
        ret.city = detalhesResp.city;
        ret.state = detalhesResp.state;
        ret.cep = detalhesResp.cep;
        ret.address = detalhesResp.address;
        ret.complement = detalhesResp.complement;
        ret.district = detalhesResp.district;
        ret.num = detalhesResp.num;

        await this.setState({
            ...this.state,
            clienteDetalhes: {
                ...this.state.clienteDetalhes,
                ...ret
            },
        });
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


    async deleteCliente(id) {
        let ret = await deletarCliente(id);
        console.log(ret)
        if (ret.status === 200) {
            this.setState({
                ...this.state,
                clienteDeletado: true
            })
            setTimeout(function () {
                window.location = "/admin/clientes";
            }, 1500)
        }
    }

    render() {

        const alertDeleted = <div className="alert alert-success">
            Cliente deletado  com sucesso.
        </div>

        return (
            <div className="container-fluid border bg-light">
                <div className="form-group mt-5">
                    <Input name="Nome" icon="file-signature" valueInput={this.state.clienteDetalhes.name} readOnly />
                    <Input name="Sobrenome" icon="signature" valueInput={this.state.clienteDetalhes.lastname} readOnly />
                    <Input name="Email" icon="envelope" valueInput={this.state.clienteDetalhes.email} readOnly />
                    <Input name="CEP" icon="map-marker-alt" valueInput={this.state.clienteDetalhes.cep} readOnly />
                    <Input name="Telefone" icon="phone" valueInput={this.state.clienteDetalhes.phone} readOnly />
                    <Input name="Cidade" icon="city" valueInput={`${this.state.clienteDetalhes.state} - ${this.state.clienteDetalhes.city}`} readOnly />
                    {/* <Input name="CEP" icon="id-card" valueInput={this.state.clienteDetalhes.cep} readOnly /> */}
                    <Input name="Bairro" icon="globe-americas" valueInput={this.state.clienteDetalhes.district} readOnly />
                    <Input name="Logradoutro" icon="road" valueInput={this.state.clienteDetalhes.address} readOnly />
                    <Input name="Numero" icon="home" valueInput={this.state.clienteDetalhes.num} readOnly />
                    <Input name="Complemento" icon="building" valueInput={this.state.clienteDetalhes.complement} readOnly />
                </div>
                {this.state.clienteDeletado ? alertDeleted : ""}

                <div className="form-group d-flex justify-content-end">
                    {/* <button className="btn btn-outline-danger mx-3" onClick={() => this.deleteCliente(this.id)}>
                        <i className="fas fa-trash"></i>
                        Excluir
                    </button> */}
                    <BtnDelete deleteFn={this.deleteCliente} idToDelete={this.id} />
                    <BtnBack route="/admin/clientes" />
                </div>
            </div>
        )
    }
}