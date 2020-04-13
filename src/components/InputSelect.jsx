import React, { Component } from "react";


export default class InputSelect extends Component {
    constructor(props) {
        super(props);
        this.makeOptions = this.makeOptions.bind(this);
    }


    makeOptions() {
        let ret = [];
        if (this.props.isOptionsLoaded) {
            this.props.options.map(
                e => ret.push(<option key={e.int_id} id={e.int_id} value={e.int_id} onClick={this.handlerOnOptionSelected}> {e.str_name}</option>)
            )
        }

        return ret
    }

    render() {

        return (
            <>
                <div className="input-group my-3 ">
                    <p className="text-primary mb-2 w-100"> {this.props.inputName} </p>
                    <div className="input-group-prepend ">
                        <label className="input-group-text rounded-left" htmor="selectCategory"> <i className={`fas fa-${this.props.iconArea} text-primary`}></i></label>
                    </div>
                    <select className="custom-select rounded-right border-none selectInput" reff={this.props.reff} value={this.props.isEdit} onChange={e => this.props.onChange(e, this.props.reff)}>
                        <option > Selecione </option>
                        {this.props.isOptionsLoaded ? this.makeOptions() : ""}
                    </select>
                    <button className="btn bg-primary text-light border-none buttonAdd ml-2" onClick={(e)=>{e.preventDefault(); this.props.handlerOnAddClicked(`${this.props.reff === "category" ? "Categoria" : "Marca"}`, true, this.props.reff)}}>
                        +
                    </button>
                </div>
            </>
        )
    }
}