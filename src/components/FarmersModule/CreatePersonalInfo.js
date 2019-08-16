import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import '../../assets/css/login.scss';
// import ReactDropzone from "react-dropzone";
import { render } from "react-dom";
import { SubmitPersonalInformation } from '../../actions/FarmersAction'
import { toastr } from 'react-redux-toastr'
import { DragAndDrop } from '../../shared'
//  ./DragAndDrop'


class CreatePersonalInfo extends Component {

    constructor() {

        super();
        this.state = {
            submitted: false,
            firstName: '',
            name: '',
            lastName: '',
            address1: '',
            address2: '',
            image: '',
            errors: {},
            tabKey: 1,
            file: {},
            errors: {},
            files: [
                'nice.pdf',
                'verycool.jpg',
            ]
        }

    }


    handleDrop = (files) => {
        let fileList = this.state.files
        for (var i = 0; i < files.length; i++) {
            if (!files[i].name) return
            fileList.push(files[i].name)
        }
        this.setState({ files: fileList })
    }


    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onhandleChangeImage = (e) => {
        debugger;
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                image: file.name
            })
        }
        reader.readAsDataURL(file);
    }

    handleSubmit = (e) => {
        debugger;
        let stateForm = this.state;
        e.preventDefault();
        this.setState({
            submitted: true
        })
        if (stateForm.name && stateForm.address1 && stateForm.address2 && stateForm.image) {
            this.props.dispatch(SubmitPersonalInformation(this.state));
            this.props.childData(1)
        } else {
            toastr.error(window.strings.MANDATORYFIELDSTEXT);
        }



    }


    componentDidMount() {
    }



    componentWillReceiveProps(nextProps) {

    }



    render() {
        const { errors } = this.state;
        console.log("err", errors);
        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-10">
                        <h3>{window.strings['FARMERS']['PERSONAL_INFORMATION']}</h3>
                        <div className="col-md-6 ">
                            <div className="p-5 clearfix">
                                <div className="">
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['NAME']}</label>


                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['NAME']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleInputChange}
                                                value={this.state.name}
                                                required

                                            />
                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['FARMERS']['NAME'] + window.strings['ISREQUIRED']}</div>}

                                        </div>
                                        {/* <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['LAST_NAME']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['LAST_NAME']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.lastName
                                                })}
                                                name="lastName"
                                                onChange={this.handleInputChange}
                                                value={this.state.lastName}
                                                required

                                            />
                                            {this.state.submitted && !this.state.lastName && <div className="mandatory">{window.strings['FARMERS']['LAST_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div> */}

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['ADDR_1']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['ADDR_1']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.address1
                                                })}
                                                name="address1"
                                                onChange={this.handleInputChange}
                                                value={this.state.address1}
                                                required

                                            />
                                            {this.state.submitted && !this.state.address1 && <div className="mandatory">{window.strings['FARMERS']['ADDR_1'] + window.strings['ISREQUIRED']}</div>}
                                        </div>



                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['ADDR_2']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['ADDR_2']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.address2
                                                })}
                                                name="address2"
                                                onChange={this.handleInputChange}
                                                value={this.state.address2}
                                                required

                                            />
                                            {this.state.submitted && !this.state.address2 && <div className="mandatory">{window.strings['FARMERS']['ADDR_2'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['IMAGE']}</label>

                                            <input
                                                type="file"
                                                placeholder={window.strings['FARMERS']['IMAGE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.image
                                                })}
                                                name="image"
                                                onChange={this.onhandleChangeImage}
                                                required

                                            />
                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['FARMERS']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        {/* <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['IMAGE']}</label>

                                            <DragAndDrop handleDrop={this.handleDrop}>
                                                <div style={{ height: 300, width: 250 }} onClick="">
                                                    {this.state.files.map((file) =>
                                                        <div>{file}</div>
                                                        // <div key={i}>{file}</div>
                                                    )}
                                                </div>
                                            </DragAndDrop>


                                        </div> */}


                                        <div className="col-md-12 pt-3 p-0">

                                            <div className="login-btn float-right">
                                                <button type="submit" className="btn btn-primary">Next Step</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps)(CreatePersonalInfo)