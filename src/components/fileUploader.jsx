import React, { Component } from 'react';

export default class FileUploader extends Component {

    fileObj = null;
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    async uploadMultipleFiles(e) {
        const formData = new FormData();
        this.fileObj = e.target.files;
        if(this.fileObj.length <= 3) {
            this.fileArray = [];
            for (let i = 0; i < this.fileObj.length; i++) {
                formData.append('files[]', this.fileObj[i]);
                this.fileArray.push(URL.createObjectURL(this.fileObj[i]))
            }
        } else {
            this.props.verifyImageLength(true)
        }
        await this.setState({ file: formData });
        
        this.props.setImage(this.state.file);
    }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    render() {
        return (
            <form>
                <div className="form-group multi-preview">
                    {(this.fileArray || []).map(url => (
                        <img src={url} alt="..." key={url} style={{width:"180px", marginLeft:'10px'}} />
                    ))}
                </div>

                <div className="form-group">
                    <input type="file" className="file-path  btn btn-primary" onChange={this.uploadMultipleFiles} multiple />
                </div>
                {/* <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button> */}
            </form >
        )
    }
}