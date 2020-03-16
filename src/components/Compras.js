import React, { Component } from "react";

export default class Compras extends Component {
    render() {
        return (
            <div className="container-fluid  pt-3 bg-light ">
                <div className="row w-100 d-flex justify-content-end">
                    <button className="btn btn-outline-success m-2" onClick={() => window.location = "/admin/clientes/new"}> Crie um novo cliente!</button>
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
                                        <th>Nome do cliente</th>
                                        <th>Data da compra</th>
                                        <th>Valor</th>
                                        <th>Ver detalhes</th>
                                    </tr>
                                </thead>



                            </table>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}