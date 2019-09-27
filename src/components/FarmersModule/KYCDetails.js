import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import { KYC_DETAILS } from '../../constants/actionTypes';
import store from '../../store/store'

class KYCDetails extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            kycName: '',
            description: '',
            image: '',
            file: '',
            userData: this.props.getUserData,
            errors: {}
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.farmerData.kycStatus == "200") {
            store.dispatch({ type: KYC_DETAILS, kycStatus: "" })
            this.listPage();
        }
    }

    listPage = () => {
        this.context.router.history.goBack();
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onhandleChangeImage = (e) => {
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

        e.preventDefault();
        this.setState({
            submitted: true
        }, () => {
            const formData = new FormData();

            formData.append("userId", this.state.userData.id);
            formData.append("name", this.state.kycName);
            formData.append("image", this.state.file);
            formData.append("description", this.state.description);

            this.props.SubmitKYCDetails(formData)
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-10">
                        <h3>{window.strings['FARMERS']['KYC_DETAILS']}</h3>
                        <div className="col-md-6 ">
                            <div className="p-5 clearfix">
                                <div className="">
                                    <form onSubmit={this.handleSubmit} noValidate>
                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['CROP_NAME']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['CROP_NAME']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.kycName
                                                })}
                                                name="kycName"
                                                onChange={this.handleInputChange}
                                                value={this.state.kycName}
                                                required

                                            />

                                            {this.state.submitted && !this.state.kycName && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['DESCRIPTION']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['DESCRIPTION']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.description
                                                })}
                                                name="description"
                                                onChange={this.handleInputChange}
                                                value={this.state.description}
                                                required

                                            />
                                            {this.state.submitted && !this.state.description && <div className="mandatory">{window.strings['FARMERS']['DESCRIPTION'] + window.strings['ISREQUIRED']}</div>}
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
                                                onChange={this.handleInputChange}
                                                value={this.state.image}
                                                required

                                            />
                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['FARMERS']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


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


function mapStateToProps(state) {
    return {
        getUserData: state && state.farmer && state.farmer.contactDatas ? state.farmer.contactDatas : [],
        farmerData: state.farmer ? state.farmer : {},
    };
}


export default connect(mapStateToProps)(KYCDetails)