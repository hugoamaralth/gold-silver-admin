import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class ListaCliente extends Component {
    render(){
        return (
            <div className="container-fluid mt-3">

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Produtos cadastrados</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Sobrenome</th>
                                    <th>Data de nascimento</th>
                                    <th>Email</th>
                                    <th>CPF</th>
                                    <th>Gênero</th>
                                    <th>Editar</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <th> Andrei </th>
                                    <th> Amaral </th>
                                    <th> 26/01/2002 </th>
                                    <th> andreiamaral74@gmail.com </th>
                                    <th> 497,586,588,24 </th>
                                    <th> Masculino </th>
                                    <td> <Link to={`/admin/clientes/edit/`} className="bg-primary" > <button className="btn bg-primary text-light btn-icon-spli">Editar <i className="fas fa-edit text-light"></i></button> </Link></td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>

        </div>
        )
    }
} 