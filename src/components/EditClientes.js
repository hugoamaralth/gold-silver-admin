import React from "react";
import Input from "./Input";
import { clientePorId, deletarCliente } from "../services/serverRequests";
import Axios from "axios";
export default class EditClientes extends React.Component {
    id = this.props.match.params.id;
    state = {
        clienteDetalhes: {},
        clienteDeletado: false
    }

    constructor(props) {
        super(props);
        this.getData();
    }

    async getData() {
        let ret = {};
        let detalhesResp = await clientePorId(this.id).then(cliente => cliente[0]);

        ret.name = detalhesResp.name;
        ret.lastname = detalhesResp.lastName;
        ret.email = detalhesResp.email;
        ret.phone = detalhesResp.phone;

        this.setState({
            ...this.state,
            clienteDetalhes: {
                ...this.state.clienteDetalhes,
                ...ret
            }
        })

        console.log(this.state.clienteDetalhes)
    }

    async deleteCliente(id) {
        let ret = await deletarCliente(id);
        if (ret.status === 200) {
            this.setState({
                ...this.state,
                clienteDeletado: true
            })
            setTimeout(function () {
                window.location = "/admin/clientes"
            }, 1500)
        }
    }

    render() {

        const alertDeleted = <div className="alert alert-success">
            Cliente deletado  com sucesso.
        </div>

        return (
            <div className="container-fluid border bg-light">
                <div className="form-group">
                    <Input name="Nome" icon="file-signature" valueInput={this.state.clienteDetalhes.name} readOnly />
                    <Input name="Sobrenome" icon="signature" valueInput={this.state.clienteDetalhes.lastname} readOnly />
                    <Input name="Email" icon="envelope" valueInput={this.state.clienteDetalhes.email} readOnly />
                    <Input name="Telefone" icon="id-card" valueInput={this.state.clienteDetalhes.phone} readOnly />
                </div>
                {this.state.clienteDeletado ? alertDeleted : ""}
                
                <div className="form-group d-flex justify-content-end">
                    <button className="btn btn-outline-danger mx-3" onClick={() => this.deleteCliente(this.id)}>
                        <i className="fas fa-trash"></i>
                        Excluir
                    </button>
                    <button className="btn btn-outline-warning" onClick={() => window.location = "/admin/clientes"}>
                        <i className="fas fa-arrow-left"></i>
                        Voltar
                    </button>
                </div>
            </div>
        )
    }
}