import React from "react";
import Input from "../Input";
export default class EditClientes extends React.Component {
    render() {
        return (
            <div className="container-fluid border">
                <div className="form-group">
                    <Input name="Nome" icon="file-signature" />
                    <Input name="Sobrenome" icon="signature" /> 
                    <Input name="Data de nascimento" icon="birthday-cake"/> 
                    <Input name="Email" icon="envelope" />
                    <Input name="CPF" icon="id-card"/>
                    <Input name="Gênero" icon="female"/>
                </div>
            </div>
        )
    }
}