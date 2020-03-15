import React, { Component } from "react";
import {SERVER_URL} from "../services/vars";

export default class Images extends Component {
    constructor(props){
        super(props);
        this.state={
            imageIndice: this.props.indice
        }
    }
    
    excluir(e){
        e.preventDefault()
    }
    
    render() {
        let url = this.props.imagemNome.includes("blob:") ? this.props.imagemNome : `${SERVER_URL}/pics/products/${this.props.imagemNome}`;
        // console.log(this.props.imagemNome)
        // console.log(this.props.imagemNome.includes("blob:"))
        return (
            <div className="h-10 image" style={{height: "220px", overflow: "hidden"}}>
                <img src={url}  style={this.props.imageStyle}alt=""/>
                <br/>   
                <button className="btn btn-outline-danger w-75 mx-auto d-flex" onClick={ (e)=> this.props.removeImage( e,this.props.indice)}> <i className="fas fa-trash w-100"></i></button>
            </div>
        )
    }
}