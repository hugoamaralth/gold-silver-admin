import React from "react";
import { Link } from "react-router-dom"

const BtnBack = props => <Link to={props.route} >
    <button className="btn btn-outline-warning">
        <i className="fas fa-arrow-left mx-2"></i>
        <b>Voltar </b>
    </button>
</Link>



const BtnSave = props => <button className=" p-2 btn btn-outline-primary mx-3 " onClick={(e) => {e.preventDefault(); props.saveFn()}}>
    <i className="fas fa-check mx-2"></i>
    <b> Salvar</b>
</button>

const BtnSaveModal = props => <button className=" p-2 btn btn-outline-primary mx-3 " onClick={() => props.saveFn()}>
    <i className="fas fa-check mx-2"></i>
    <b> Salvar</b>
</button>

const BtnDelete = props => <button className=" p-2 btn btn-outline-danger mx-3 " onClick={e => {e.preventDefault();props.deleteFn(props.idToDelete)}}>
    <i className="fas fa-trash mx-2"></i>
    <b> Excluir </b>
</button>


const BtnCloseModal = props => <button className="btn btn-outline-danger" onClick={props.closeFn()}>
    <i className="fas fa-times mx-2"></i>
    <b>Fechar </b>
</button>

export { BtnBack, BtnSave, BtnCloseModal, BtnSaveModal, BtnDelete };