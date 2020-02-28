import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import store from '../../store/store';
import { path } from '../../constants';
import { REGION_CREATE_SUCCESS, REGION_UPDATE_SUCCESS } from '../../constants/actionTypes';
import { toastr } from 'react-redux-toastr';
import Select from "react-select";
import { getSpecificRegion, submitRegion } from '../../actions/regionAction'
import { fetchDcCodeList } from '../../actions/dcAction';

class CreateRegion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            submitted: false,
            name: '',
            currentSelection: [],
            currentPage: 0,
            itemPerPage: 10
        }
    }
    componentDidMount() {
        this.getDcCodeData()
        if (this.props.location && this.props.location.state && this.props.location.state.id) {
            this.setState({ regionId: this.props.location.state.id })
            this.getSpecificRegion();
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps && newProps.regionData) {
            if (newProps.regionData.createdStatus == "200") {
                store.dispatch({ type: REGION_CREATE_SUCCESS, createdStatus: "" })
                this.redirectPage();
            }
            if (newProps.regionData.updateStatus == "200") {
                store.dispatch({ type: REGION_UPDATE_SUCCESS, updateStatus: "" })
                this.redirectPage();
            }
        }
        if (this.props.location && this.props.location.state && this.props.location.state.id && newProps && newProps.regionData && newProps.regionData.specificData && newProps.regionData.specificData.datas && newProps.regionData.specificData.datas[0]) {
            let editData = newProps.regionData.specificData.datas[0];
            let poolAry = [];
            editData.dcDatas && editData.dcDatas.map((item) => {
                let obj = {
                    "value": item.dcCode,
                    "label": item.dcCode
                }
                poolAry.push(obj);
            })
            this.setState({ name: editData.name, currentSelection: poolAry })
        }
    }
    getDcCodeData = () => {
        let obj = { search: this.state.search }
        fetchDcCodeList(obj).then(resp => {
            if (resp && resp.datas) {
                this.setState({ dcDropData: resp.datas })
            }
        })
    }
    getRegionList = () => {
        let obj = {
            page: this.state.currentPage,
            rows: this.state.itemPerPage
        }
        this.props.getRegion(obj)
    }
    getSpecificRegion = () => {
        let obj = {
            id: this.props.location.state.id
        }
        this.props.getSpecificRegion(obj);
    }

    listPath = () => {
        this.props.history.push({ pathname: path.region.list, state: { regionSessionData: 'regionSessionBack' } })
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handlePoolChange = (Data) => {
        this.setState({ currentSelection: Data });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })
        if (this.state.name && this.state.currentSelection && this.state.currentSelection.length > 0) {
            let poolAry = [];
            this.state.currentSelection && this.state.currentSelection.map(item => {
                if (item) {
                    let dcId = item.label && item.label.split('DC');
                    let obj = {
                        dcId: dcId[1]
                    }
                    poolAry.push(obj);
                }
            })

            let obj = {
                "name": this.state.name,
                "regionDc": poolAry,
                "id": this.props.location && this.props.location.state && this.props.location.state.id
            }
            this.props.submitRegion(obj);
        } else {
            toastr.error("Mandatory Fields are missing");
        }
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.region.list, state: { poolSessionData: 'poolSessionBack' } });
    }

    render() {
        const { errors } = this.state;
        let dropDownData = [];
        this.state.userData && this.state.userData.map((item) => {
            let obj = { "label": item.name, "value": item.id };
            dropDownData.push(obj);
        })
        let pollData = [];
        this.state.dcDropData && this.state.dcDropData.map((item) => {
            let obj = { "value": item.dcCode, "label": item.dcCode, indeterminate: true };
            pollData.push(obj);
        })
        let plcHolder = "";
        if (this.state.currentSelection && this.state.currentSelection.length > 0) {
            plcHolder = this.state.currentSelection.length + ' ' + 'Selected'
        } else {
            plcHolder = "Select"
        }


        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-12">
                        <h4 className="user-title">{this.state.regionId ? window.strings['DC_MANAGEMENT']['EDIT_REGION'] : window.strings['DC_MANAGEMENT']['ADD_REGION']}</h4>
                        <div className="main-wrapper pt-3">
                            <div className="col-md-10">
                                <form onSubmit={this.handleSubmit} noValidate className="row m-0">
                                    <div className="form-group col-md-6">
                                        <label>{window.strings.DC_MANAGEMENT.REGION_NAME} *</label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            onChange={this.handleInputChange}
                                            value={this.state.name}
                                            className={classnames('form-control')}
                                        // disabled={this.state.poolId}
                                        />
                                        {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['DC_MANAGEMENT']['REGION_NAME']}{window.strings['ISREQUIRED']}</div>}
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>{window.strings.DC_MANAGEMENT.SELECT_DC} *</label>
                                        <Select

                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }
                                                })
                                            }}
                                            closeMenuOnSelect={false}
                                            isMulti={true}
                                            options={pollData}
                                            hideSelectedOptions={false}
                                            value={this.state.currentSelection}
                                            backspaceRemovesValue={false}
                                            onChange={(e) => this.handlePoolChange(e)}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-12 bottom-section">
                                <button type="button" className="btn btn-default mb-2" onClick={this.listPath}>{window.strings.CANCEL}</button>
                                <button type="submit" className="btn btn-primary mb-2" disabled={this.state.loading} onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    regionData: state.region
})

export default connect(mapStateToProps, { getSpecificRegion, fetchDcCodeList, submitRegion })(CreateRegion);
