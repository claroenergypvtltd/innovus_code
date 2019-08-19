import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import { SubmitKYCDetails } from '../../actions/FarmersAction'

class KYCDetails extends Component {

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

        e.preventDefault();
        this.setState({
            submitted: true
        }, () => {

            // let obj = {
            //     "userId": this.state.userData.id,
            //     "name": this.state.kycName,
            //     "description": this.state.description
            // }

            // cropDetails


            const formData = new FormData();

            // formData.append("userId",this.state.userData.id);
            formData.append("userId", 44);
            formData.append("name", this.state.kycName);
            formData.append("image", this.state.file);
            formData.append("description", this.state.description);



            SubmitKYCDetails(formData).then(resp => {
                if (resp) {
                    debugger;
                }
            })

            // params:  image, userId, name, description


        })

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
        getUserData: state && state.farmer && state.farmer.contactDatas ? state.farmer.contactDatas : []
    };
}


export default connect(mapStateToProps)(KYCDetails)