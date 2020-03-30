import React, { Component } from "react";
import { Link } from "react-router-dom";
import { listarClientes } from "../services/serverRequests";

function Linha(props) {
    return (
        <tr key={props.id}>
            <td>{props.name}</td>
            <td>{props.sobrenome}</td>
            <td>{props.email}</td>
            <td>{props.telefone}</td>
            <td> <Link to={`/admin/clientes/edit/${props.id}`} className="bg-primary" > <button className="btn bg-primary text-light btn-icon-spli">Editar <i className="fas fa-edit text-light"></i></button> </Link></td>
        </tr>
    )
}

export default class ListaCliente extends Component {
    state = {
        dataClientes: []
    }

    constructor(props) {
        super(props);
        this.getData();
    }

    makeTable() {
        let { dataClientes } = this.state;
        let ret = [];
        dataClientes.map(
            (e, i) => ret.push(<Linha name={e.name} sobrenome={e.lastName} id={e.id} key={i} email={e.email} telefone={e.phone} />)
        )
        return (
            <tbody id="table-body">
                {ret}
            </tbody>
        );
    }

    getData() {
        let clienteResp = [];
        listarClientes().then(
            data => {
                data.map(
                    resp => clienteResp.push(resp),
                )
                this.setState({
                    ...this.state,
                    dataClientes: clienteResp
                })
            }
        )
    }

    render() {
        return (
            <div className="container-fluid  pt-3 bg-light ">
                <div className="row w-100 d-flex justify-content-end">
                    <button className="btn btn-outline-success m-2" onClick={()=> window.location ="/admin/clientes/new"}> Crie um novo cliente!</button>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Clientes cadastrados</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Sobrenome</th>
                                        <th>Email</th>
                                        <th>telefone</th>
                                        <th>Editar</th>
                                    </tr>
                                </thead>

                                {this.makeTable()}

                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
} 