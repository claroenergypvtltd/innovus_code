import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrackDetails, SubmitOrderStatus } from '../../actions/orderAction'
import classnames from 'classnames';
import PropTypes from "prop-types";

class StatusUpdate extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            statusData: [],
            orderId: '',
            status: '',
            location: '',
            activity: '',
            farmDatas: this.props.getFarmData,
            errors: {}
        }
    }

    componentDidMount() {
        this.getStatus();
        if (this.props.orderId) {
            this.getTrackDetails();
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps && newProps.orderDetails && newProps.orderDetails.trackLists && newProps.orderDetails.trackLists.orderWareHouse && newProps.orderDetails.trackLists.orderWareHouse[0]) {
            let formDatas = newProps.orderDetails.trackLists.orderWareHouse[0]
            this.setState({ status: formDatas.status, location: formDatas.location, activity: formDatas.activity });
        }
    }

    redirectPage = () => {
        this.props.onCloseModal();
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
        })

        let obj = {
            "orderId": this.props.orderId,
            "activity": this.state.activity,
            "location": this.state.location,
            "status": this.state.status,
        }
        if (this.props.orderId && this.state.activity && this.state.location && this.state.status) {
            SubmitOrderStatus(obj).then(resp => {
                if (resp) {
                    this.props.onCloseModal();
                }
            });
        }
    }

    getTrackDetails = () => {
        this.props.getTrackDetails(this.props.orderId);
    }

    getStatus = () => {

        let statusData = [
            {
                "id": "1",
                "label": "Order placed"
            },
            {
                "id": "2",
                "label": "Order Accepted"
            },
            {
                "id": "3",
                "label": "Order processed"
            },
            {
                "id": "4",
                "label": "shipped"
            },
            {
                "id": "5",
                "label": "At distrubed Center"
            },
            {
                "id": "6",
                "label": "Delivered"
            },
            {
                "id": "7",
                "label": "cancel"
            }
        ];
        this.setState({ statusData });
    }

    listPath = () => {
        this.props.history.goBack();
    }

    render() {
        const { errors } = this.state;

        const statusDropDown = this.state.statusData && this.state.statusData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.label}</option>
        });

        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-12">
                        <div className="col-md-9">
                            <div className="create-crop">
                                <form onSubmit={this.handleSubmit} noValidate className="row m-0 pt-3">
                                    <div className="form-group col-md-12">
                                        <label>{window.strings['ORDER']['STATUS']}</label>
                                        <select required name="status" className="form-control" value={this.state.status} onChange={this.handleInputChange}>
                                            <option value="0">Select Status</option>
                                            {statusDropDown}
                                            <option value="1">Pending</option>
                                        </select>

                                        {this.state.submitted && !this.state.status && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label>{window.strings.ORDER.LOCATION}</label>
                                        <input
                                            type="text"
                                            placeholder={window.strings.ORDER.LOCATION}
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.location
                                            })}
                                            name="location"
                                            onChange={this.handleInputChange}
                                            value={this.state.location}
                                            required
                                        />
                                        {this.state.submitted && !this.state.location && <div className="mandatory">{window.strings['CATEGORY']['LOCATION'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label>{window.strings.ORDER.ACTIVITY}</label>
                                        <textarea
                                            placeholder={window.strings.ORDER.ACTIVITY}
                                            className={classnames('form-control form-control-lg', {
                                                'is-invalid': errors.activity
                                            })}
                                            name="activity"
                                            onChange={this.handleInputChange}
                                            value={this.state.activity}
                                            required
                                        ></textarea>
                                        {this.state.submitted && !this.state.activity && <div className="mandatory">{window.strings['ORDER']['ACTIVITY'] + window.strings['ISREQUIRED']}</div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-md-12 bottom-section">
                            <button type="button" className="btn btn-default" onClick={this.redirectPage}>{window.strings.CANCEL}</button>
                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    orderDetails: state.order ? state.order : {}
})


export default connect(mapStateToProps, { getTrackDetails, SubmitOrderStatus })(StatusUpdate)