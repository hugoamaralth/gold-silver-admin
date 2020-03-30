import React, { Component } from "react";

export default class InputSelect extends Component {
    render() {
        return (

            <div className="input-group mb-2 ml-2">
                <p className="text-primary mb-2 w-100"> Categorias</p>
                <div className="input-group-prepend">
                    <label className="input-group-text" htmor="selectCategory"> <i className='fas fa-align-center'></i></label>
                </div>
                <select className="custom-select" reff="category" id="selectCategory" onChange={e => console.log(e.target.value)}>
                    {
                        this.props.options
                    }
                </select>
            </div>
        )
    }
}