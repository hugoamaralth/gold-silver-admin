import React, { Component } from "react";


export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueInput: this.props.valueInput || '',
            name: this.props.name,
            readOnly : this.props.readOnly

        }
    }

    changeValue(e) {
        this.setState({
            ...this.state,
            valueInput: e.target.value
        });
        this.props.onChange({
            value:e.target.value,
            key: this.props.reff
        })
    }

    updateState() {
        this.setState({
            ...this.state,
            valueInput: this.props.valueInput || '',
            name: this.props.name
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.valueInput !== this.state.valueInput) {
            this.setState({ valueInput: nextProps.valueInput });
        }
    }

    render() {
        return (
            <div className="form-group has-error has-feedback h-100 ">
                <label htmlFor={this.props.id} className={`text-primary control-label   ${this.props.inputLa}`} >{this.props.name}</label>
                <div className={`input-group mb-2 mr-sm-2 ${this.props.inputClass}`} >
                    <div className="input-group-prepend">
                        <div className="input-group-text"> <i className={`fas fa-${this.props.icon} text-primary`}></i></div>
                    </div>
                    <input readOnly={this.state.readOnly ? true : false} type={this.props.typeInput} placeholder={this.props.placeholder} id={this.props.id} className="form-control" onChange={e => this.changeValue(e)} value={this.state.valueInput || ""} />
                </div>
            </div>
        )

    }
}
