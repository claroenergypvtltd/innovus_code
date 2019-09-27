import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import { SubmitIrregationSchedule } from '../../actions/FarmersAction'
import { deleteIrrigation } from '../../actions/UserAction'
import { formatDate } from '../../shared/DateFormat'
import store from '../../store/store'
import { IRRIGATION_SCHEDULE } from '../../constants/actionTypes';

class CreateIrrigationSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            cropName: '',
            sowingDate: '',
            harvestDate: '',
            cropId: '',
            errors: {},
            cropDetails: this.props.cropDetails,
            IrrigationDetails: [{ irrigation_Date: "" }],
            sowingData: {},
            harvestData: {},
            buttonHide: true,
            checked: false,
            isCheckBoxVisible: true,
            AllChecked: false
        }
    }

    componentDidMount() {
        this.editIrrigation();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.farmerData && newProps.farmerData.irrigationStatus == "200") {
            store.dispatch({ type: IRRIGATION_SCHEDULE, irrigationStatus: '' });
            this.listPath();
        }
    }

    editIrrigation() {
        if (this.props.location && this.props.location.state && this.props.location.state.farmDetails && this.props.location.state.farmDetails.crops && this.props.location.state.farmDetails.crops[0] && this.props.location.state.farmDetails.crops[0].irrigation && this.props.location.state.farmDetails.crops[0].irrigation[0]) {
            this.setState({ cropDetails: this.props.location.state.farmDetails }, () => {
                this.setIrrigationData();
            })
        } else {
            this.setIrrigationData();
        }
    }


    setIrrigationData() {
        if (this.state.cropDetails && this.state.cropDetails.crops && this.state.cropDetails.crops[0]) {
            let farmDetails = this.state.cropDetails;
            let cropDetails = this.state.cropDetails.crops[0]

            this.setState({
                cropId: cropDetails.id, cropName: cropDetails.category.name,
                farmName: farmDetails.name
            }, () => {
                let IrriData = [];
                cropDetails.irrigation.forEach((item, key) => {
                    if (key == 0) {
                        this.setState({ sowingDate: formatDate(item.irrigationDate), sowingData: item });
                    } else if (key == 1) {
                        this.setState({ harvestDate: formatDate(item.irrigationDate), harvestData: item });
                    } else {
                        let orderObj = { irrigation_Date: formatDate(item.irrigationDate), id: item.id, name: item.name, isBooked: item.isBooked };
                        IrriData.push(orderObj);
                        this.setState({ IrrigationDetails: IrriData })
                    }
                })
            })
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleIrrigation = (idx) => (evt) => {
        const newOrders = this.state.IrrigationDetails.map((item, sidx) => {
            if (idx !== sidx) return item;
            return { ...item, irrigation_Date: evt.target.value };
        });

        this.setState({ IrrigationDetails: newOrders });
    }


    addIrrigationField = () => {
        this.setState({
            IrrigationDetails: this.state.IrrigationDetails.concat([{ irrigation_Date: '' }])
        });
    }

    removeIrrigationField = (id, irriData) => {
        this.setState({
            IrrigationDetails: this.state.IrrigationDetails.filter((s, sid) => id !== sid)
        })
        if (irriData.id) {
            deleteIrrigation(irriData.id);
        }
    }

    handleBookIrrigation = (id) => {
        this.state.IrrigationDetails.forEach((item, key) => {
            if (key === id) {
                item.isBooked = !item.isBooked ? 1 : 0;
            }
        })
        this.setState({ IrrigationDetails: this.state.IrrigationDetails })

    }

    handleSowDate = () => {
        this.setState(prevState => ({
            sowingData: {
                ...prevState.sowingData, isBooked: !prevState.sowingData.isBooked ? 1 : 0
            }
        }))
    }

    handleHarvestDate = () => {
        this.setState(prevState => ({
            harvestData: {
                ...prevState.harvestData, isBooked: !prevState.harvestData.isBooked ? 1 : 0
            }
        }))
    }


    selectAllCheckBoxes = (event) => {
        this.state.AllChecked = event.target.checked;
        const allCheckboxChecked = event.target.checked
        var checkboxes = document.getElementsByName("subscription");

        if (allCheckboxChecked) {

            for (var i in checkboxes) {
                if (checkboxes[i].checked === false) {
                    checkboxes[i].checked = true
                }
            }

        } else {
            for (var i in checkboxes) {
                if (checkboxes[i].checked === true) {
                    checkboxes[i].checked = false
                }
            }
        }
    }

    listPath = () => {
        this.props.history.goBack();
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.setState({
            submitted: true
        }, () => {

            let irrayArray = [];

            if (this.state.sowingData) {
                let sowingData = this.state.sowingData;
                let obj = {
                    "cropId": this.state.cropId,
                    "name": sowingData.name,
                    "id": sowingData.id ? sowingData.id : '',
                    "isBooked": this.state.AllChecked ? 1 : sowingData.isBooked,
                    "irrigationDateStr": this.state.sowingDate
                }
                irrayArray.push(obj);
            }

            if (this.state.harvestData) {
                let harvestData = this.state.harvestData;
                let obj = {
                    "cropId": this.state.cropId,
                    "name": harvestData.name,
                    "id": harvestData.id ? harvestData.id : '',
                    "isBooked": this.state.AllChecked ? 1 : harvestData.isBooked,
                    "irrigationDateStr": this.state.harvestDate
                }
                irrayArray.push(obj);
            }


            this.state.IrrigationDetails.forEach(item => {
                let obj = {
                    "cropId": this.state.cropId,
                    "name": item.name ? item.name : "Irrigation" + 1,
                    "id": item.id ? item.id : '',
                    "isBooked": this.state.AllChecked ? 1 : item.isBooked,
                    "irrigationDateStr": item.irrigation_Date,
                    "sowingDate": this.state.sowingDate,
                    "harvestDate": this.state.harvestDate
                }
                irrayArray.push(obj);
            })
            this.props.SubmitIrregationSchedule(irrayArray);
        })
    }

    render() {
        const { errors } = this.state;

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

                                            <label>{window.strings['FARMERS']['FARM_NAME']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['FARM_NAME']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.cropName
                                                })}
                                                name="cropName"
                                                onChange={this.handleInputChange}
                                                value={this.state.cropName}
                                                required
                                                disabled
                                            />
                                        </div>

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
                                                disabled
                                            />

                                            {this.state.submitted && !this.state.cropName && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div>
                                            <input type="checkbox" name="allSelect" value="all" onChange={this.selectAllCheckBoxes} />
                                            <label>Select full session</label>
                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['SOWING_DATE']}</label>
                                            <input type="checkbox" name="subscription" value={this.state.sowingData.isBooked} onClick={() => this.handleSowDate()} checked={this.state.sowingData.isBooked} />
                                            <input
                                                type="date"
                                                placeholder={window.strings['FARMERS']['SOWING_DATE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.sowingDate
                                                })}
                                                name="sowingDate"
                                                onChange={this.handleInputChange}
                                                value={this.state.sowingDate}
                                                required
                                            />
                                            {this.state.submitted && !this.state.sowingDate && <div className="mandatory">{window.strings['FARMERS']['SOWING_DATE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>



                                        <div className="form-group pt-3">
                                            {this.state.IrrigationDetails && this.state.IrrigationDetails.map((irrDet, index) => {
                                                return (
                                                    < div >
                                                        <div>Irrigation {index + 1}</div>

                                                        <div>
                                                            <input type="checkbox" name="subscription" value={irrDet.isBooked} onClick={() => this.handleBookIrrigation(index)} checked={irrDet.isBooked} />

                                                            <input
                                                                type="date"
                                                                value={irrDet.irrigation_Date}
                                                                onChange={this.handleIrrigation(index)}
                                                                className={classnames('form-control form-control-lg', {
                                                                    'is-invalid': errors.cropName
                                                                })}
                                                                required
                                                            />


                                                        </div>
                                                        {/* {this.state.buttonHide ? <button type="button" onClick={() => this.addIrrigationField(index, irrDet)} >+</button> : null} */}
                                                        {this.state.IrrigationDetails.length !== 1 && <button type="button" onClick={() => this.addIrrigationField()} >+</button>}
                                                        {<button type="button" onClick={() => this.removeIrrigationField(index, irrDet)} >-</button>}
                                                    </div>
                                                )

                                            })}

                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['HARVEST_DATE']}</label>
                                            <input type="checkbox" name="subscription" value={this.state.harvestData.isBooked} onClick={() => this.handleHarvestDate()} checked={this.state.harvestData.isBooked} />
                                            <input
                                                type="date"
                                                placeholder={window.strings['FARMERS']['HARVEST_DATE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.harvestDate
                                                })}
                                                name="harvestDate"
                                                onChange={this.handleInputChange}
                                                value={this.state.harvestDate}
                                                required
                                            />
                                            {/* {this.state.submitted && !this.state.harvestDate && <div className="mandatory">{window.strings['FARMERS']['HARVEST_DATE'] + window.strings['ISREQUIRED']}</div>} */}
                                        </div>

                                        <div className="col-md-12 pt-3 p-0">

                                            <div className="login-btn float-right">
                                                <button type="button" onClick={this.listPath} className="btn btn-primary">Cancel</button>
                                                <button type="submit" className="btn btn-primary">Save</button>
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


const mapStateToProps = (state) => {
    return {
        cropDetails: state && state.user && state.user.farmDetails ? state.user.farmDetails : [],
        farmerData: state && state.farmer ? state.farmer : {}
    };
}


export default connect(mapStateToProps, { SubmitIrregationSchedule })(CreateIrrigationSchedule)
