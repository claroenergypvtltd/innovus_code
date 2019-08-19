import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import { SubmitIrregationSchedule } from '../../actions/FarmersAction'

class CreateIrrigationSchedule extends Component {

    constructor(props) {

        super(props);
        this.state = {
            submitted: false,
            cropName: '',
            showingDate: '',
            errors: {},
            cropDetails: this.props.cropDetails
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.setState({
            submitted: true
        }, () => {

            let obj = [{
                "cropId": this.state.cropDetails && this.state.cropDetails.id,
                "name": this.state.cropName,
                "irrigationDateStr": this.state.showingDate
            }]

            // cropDetails
            SubmitIrregationSchedule(obj).then(resp => {
                if (resp) {
                    this.props.childData(5); //6 th tab 
                }
            })
        })
    }

    render() {
        const { errors } = this.state;
        console.log("err", errors);
        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-10">
                        <h3>{window.strings['FARMERS']['NEW_IRRIGATION_SCHEDULE']}</h3>
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
                                                    'is-invalid': errors.cropName
                                                })}
                                                name="cropName"
                                                onChange={this.handleInputChange}
                                                value={this.state.cropName}
                                                required

                                            />

                                            {this.state.submitted && !this.state.cropName && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['SHOWING_DATE']}</label>

                                            <input
                                                type="date"
                                                placeholder={window.strings['FARMERS']['SHOWING_DATE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.showingDate
                                                })}
                                                name="showingDate"
                                                onChange={this.handleInputChange}
                                                value={this.state.showingDate}
                                                required

                                            />
                                            {this.state.submitted && !this.state.showingDate && <div className="mandatory">{window.strings['FARMERS']['SHOWING_DATE'] + window.strings['ISREQUIRED']}</div>}
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
        cropDetails: state && state.farmer && state.farmer.cropDetails ? state.farmer.cropDetails : []
    };
}


export default connect(mapStateToProps)(CreateIrrigationSchedule)