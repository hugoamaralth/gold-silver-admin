import React, { Component } from "react";
import { listarCompras } from "../services/serverRequests";
import { Link } from "react-router-dom";

function Linha(props) {
    return (
        <tr key={props.i}>
            <td>{props.name}</td>
            <td>{props.data}</td>
            <td> <Link to={`/admin/compras/edit/${props.code}`} > <button className="btn btn-outline-warning btn-icon-spli">Ver detalhes <i className="fas fa-edit"></i></button> </Link></td>
        </tr>
    )
}

export default class Compras extends Component {
    state = {
        clienteLista: [],
    }

    constructor(props) {
        super(props);
        this.getClients = this.getClients.bind(this);
        this.getClients()
    }

    treatDate(date) {
        date = date.split(" ");
        let hour = date[1].split(":");
        hour = hour[0] + ':' + hour[1];
        date = date[0].split("-");
        date = date[2] + "/" + date[1] + "/" + date[0];
        return date + ' - ' + hour;
    }

    getClients() {
        listarCompras().then(obj => {
            let details = obj.data;
            details.map(e => {
                e.date = this.treatDate(e.date);
                return e
            })
            console.log(details)

            this.setState({
                ...this.state,
                clienteLista: [...details]
            })
        })
    }

    makeTable() {
        const ret = [];
        this.state.clienteLista.forEach((e,i) =>
            ret.push(<Linha name={e.client} data={e.date} key={i} code={e.code}/>) 
        )
        return ret
    }


    render() {
        return (
            <div className="container-fluid  pt-3 bg-light">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Compras Realizadas</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Nome do cliente</th>
                                        <th>Data da compra</th>
                                        <th>Ver detalhes</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.makeTable()}
                                </tbody>


                            </table>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}
