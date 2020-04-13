import React from "react";
import { listarComprasDetalhes, getCode, saveDetails, saveDetail } from "../services/serverRequests";
import { BtnBack, BtnSave } from "../components/Button";
// import { Link } from "react-router-dom"

function LinhaProdutos(props) {
    let totalItem = props.valor * props.quantidade;
    return (
        <tr key={props.i}>
            <td>{props.nome}</td>
            <td>{props.quantidade}</td>
            <td>{props.valor}</td>
            <td>{totalItem}</td>
        </tr>
    )
}

function LinhaLocalidade(props) {
    let {complement} = props;
    if(typeof complement === "object") complement = ""
    return (
        <tr key={props.i}>
            <td>{props.pais}</td>
            <td>{props.estado_cidade}</td>
            <td>{props.bairro}</td>
            <td>{props.rua}</td>
            <td>{props.numero}</td>
            <td>{complement}</td>
        </tr>
    )
}



export default class DetalhesCompras extends React.Component {
    id = this.props.match.params.id;
    paymentStatusNames = {
        1: 'Aguardando pagamento',
        2: 'Em análise',
        3: 'Paga',
        4: 'Paga',
        7: 'Cancelada'
    };

    paymentMethodNames = {
        1: 'Cartão de crédito',
        2: 'Boleto',
        3: 'Débito online (TEF)',
        4: 'Saldo PagSeguro',
        5: 'Oi Paggo',
        7: 'Depósito em conta'
    }

    state = {
        itens: undefined,
        isEverythingLoaded: false,
        codigoRast:"",
    }

    constructor(props) {
        super(props);
        this.listar = this.listar.bind(this);
        this.saveDetails = this.saveDetails.bind(this)
        this.listar();
        this.getCode();
    }

    async saveDetails(){
        const ret = await saveDetail(this.id, this.state.codigoRast)
        console.log(ret)
        
    }

    async getCode() {
        const ret = await getCode(this.id);

        this.setState({
            ...this.state,
            codigoRast: ret[0].code_shipping

        })
    }


    
    async listar() {
        let shopDetails = await listarComprasDetalhes(this.id);
        console.log(shopDetails)
        let itens = shopDetails.items.item;
        this.setState({
            ...this.state,
            payment: shopDetails.paymentMethod.type,
            status: shopDetails.status,
            isEverythingLoaded: true,
            address: shopDetails.shipping.address,
            country: shopDetails.shipping.address.country,
            itens: [...itens],
            // complement: shopDetails.shipping.address.complement
        })
    }

    makeTableStatus() {
        return <th>{this.paymentStatusNames[this.state.status]}</th>
    }

    makeTablePayment() {
        return <th>{this.paymentMethodNames[this.state.payment]}</th>
    }

    makeTableItens() {
        let ret = [];
        this.state.itens.forEach((e, i) => ret.push(<LinhaProdutos key={i} nome={e.description} quantidade={e.quantity} valor={e.amount} />))
        return ret
    }

    makeTableLocalidade() {
        let { address } = this.state;
        let estadoCidade = `${address.state} - ${address.city}`;
        let ret =
            <LinhaLocalidade pais={address.country} rua={address.street} numero={address.number} bairro={address.district} estado_cidade={estadoCidade} complement={address.complement } />
        return ret
    }

    handlerOnChangeInput(value){
        let ret = value;
        this.setState({
            ...this.state,
            codigoRast: ret
        })
    }


    render() {
        return (
            <div className="container m-0 p-0 ">
                <div className="d-flex justify-content-between mt-2 p-3">
                    <div >
                        <h4 className="text-primary"> Código de rastreamento</h4>
                        <input value={this.state.codigoRast} className="input form-control" onChange={e => this.handlerOnChangeInput(e.target.value)} />
                    </div>
                    <h3 className='text-primary my-3 text-center mr-5'>Detalhes do pedido</h3>
                    <div >
                        <BtnBack route="/admin/compras" />
                        <BtnSave saveFn={this.saveDetails} />
                    </div>
                </div>
                <div>
                    <h4 className="text-primary my-4 ml-3"> Pagamento </h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-primary"> Status </th>
                                <th className="text-primary"> Forma de pagamento </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {this.makeTableStatus()}
                                {this.makeTablePayment()}
                            </tr>

                        </tbody>
                    </table>
                </div>

                <div>
                    <h4 className="text-primary my-4 ml-3"> Localidade </h4>
                    <table className="table">
                        <thead>
                            <tr >
                                <th className="text-primary">País </th>
                                <th className="text-primary ">Estado - Cidade </th>
                                <th className="text-primary ">Bairro </th>
                                <th className="text-primary ">Rua </th>
                                <th className="text-primary ">Numero </th>
                                <th className="text-primary "> Complemento </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isEverythingLoaded ? this.makeTableLocalidade() : <></>}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h4 className="text-primary my-4 ml-3"> Itens </h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <td className="text-primary"> Nome</td>
                                <td className="text-primary"> Quantidade</td>
                                <td className="text-primary"> Valor Unitário</td>
                                <td className="text-primary"> total item</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.isEverythingLoaded ? this.makeTableItens() : console.log("carregando...")}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

