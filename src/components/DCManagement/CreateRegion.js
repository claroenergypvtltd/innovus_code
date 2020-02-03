import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getTypes } from '../../actions/priceAction'
import { getPriceList } from '../../actions/priceAction'
import { submitPool, getPoolList } from '../../actions/poolAction'
import store from '../../store/store';
import { path } from '../../constants';
import { POOL_CREATE_SUCCESS, POOL_UPDATE_SUCCESS } from '../../constants/actionTypes';
import { toastr } from 'react-redux-toastr';
import Select from "react-select";

class CreateRegion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            submitted: false,
            name: '',
            currentSelection: []
        }
    }
    componentDidMount() {
        this.getWeightDatas();
        this.getPriceList();
        if (this.props.location && this.props.location.state && this.props.location.state.poolId) {
            this.setState({ poolId: this.props.location.state.poolId })
            this.getPoolList();
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps && newProps.priceData && newProps.priceData.Lists && newProps.priceData.Lists.datas) {
            let respData = newProps.priceData.Lists.datas;
            this.setState({ PriceLists: respData })
        }
        if (newProps && newProps.poolData) {
            if (newProps.poolData.createdStatus == "200") {
                store.dispatch({ type: POOL_CREATE_SUCCESS, createdStatus: "" })
                this.redirectPage();
            }
            if (newProps.poolData.updateStatus == "200") {
                store.dispatch({ type: POOL_UPDATE_SUCCESS, updateStatus: "" })
                this.redirectPage();
            }
        }
        if (this.props.location && this.props.location.state && this.props.location.state.poolId && newProps && newProps.poolData && newProps.poolData.Lists && newProps.poolData.Lists.datas && newProps.poolData.Lists.datas[0]) {
            let editData = newProps.poolData.Lists.datas[0];
            let poolAry = [];
            let rupeesUnit = editData.quantityUnit
            editData.pools && editData.pools.forEach((item, index) => {
                let obj = {
                    "value": editData.productName[index] + '-' + item.dcCode,
                    "label": editData.productName[index] + '-' + item.dcCode,
                    "parentQuantityData": { "parentId": item.productId, "rupeesUnit": rupeesUnit }
                }
                poolAry.push(obj);
            })
            this.setState({ name: editData.name, quantityUnit: editData.quantityUnit, weight: editData.quantity, currentSelection: poolAry })
        }
    }

    getPoolList = () => {
        let obj = {
            poolId: this.props.location.state.poolId
        }
        this.props.getPoolList(obj);
    }

    getWeightDatas = () => {
        getTypes().then(resp => {
            if (resp) {
                this.setState({ typeDatas: resp }, () => {
                    this.setWeightData();
                })
            }
        })
    }

    getPriceList(type) {
        let obj = {
            pages: 0
        }
        this.props.getPriceList(obj)
    }

    setWeightData() {
        let typeArray = [];
        this.state.typeDatas && this.state.typeDatas.map(item => {
            let obj = {
                "name": item.name,
                "id": item.id,
            }
            typeArray.push(obj);
        })
        this.setState({ weightDatas: typeArray });
    }
    listPath = () => {
        this.props.history.push({ pathname: path.region.list, state: { poolSessionData: 'regionSessionBack' } })
    }
    handleInputChange = (e) => {
        if (e.target.name == "updateQuantity" && (e.target.value.includes("-") && Math.abs(e.target.value) > this.state.weight) || e.target.name == "updateQuantity" && (e.target.value.includes("."))) {
            toastr.error("Invalid Increase/Decrease quantity")
            this.setState({ [e.target.name]: '' })
        } else {
            e.charCode == 45 || e.charCode == 43 ? e.target.value = '' : this.setState({ [e.target.name]: e.target.value })
        }
    }
    handlePoolChange = (Data) => {
        this.setState({ currentSelection: Data });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })
        let rupeesUnit = 0;
        if (this.state.name && this.state.currentSelection && this.state.currentSelection.length > 0) {
            let poolAry = [];
            this.state.currentSelection && this.state.currentSelection.map(item => {
                let poolData = item.label && item.label.split('-');
                rupeesUnit = item.parentQuantityData.rupeesUnit;
                let obj = {
                    productId: item.parentQuantityData && item.parentQuantityData.parentId,
                    dcCode: poolData[1]
                }
                poolAry.push(obj);
            })

            let obj = {
                "name": this.state.name,
                "regionDc": poolAry,
                "id": this.props.location && this.props.location.state && this.props.location.state.poolId
            }
            this.props.submitPool(obj);
        }
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.pool.list, state: { poolSessionData: 'poolSessionBack' } });
    }

    render() {
        const { errors } = this.state;
        let dropDownData = [];
        this.state.userData && this.state.userData.map((item) => {
            let obj = { "label": item.name, "value": item.id };
            dropDownData.push(obj);
        })
        let pollData = [];
        this.state.PriceLists && this.state.PriceLists.map((item) => {
            let obj = { "value": item.name + '-' + item.productDetail.dcCode, "label": item.name + '-' + item.productDetail.dcCode, indeterminate: true, "parentQuantityData": { "parentId": item.id, "rupeesUnit": item.productDetail.rupeesUnit } };
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
    priceData: state.price ? state.price : {},
    poolData: state.pool
})

export default connect(mapStateToProps, { getPriceList, submitPool, getPoolList })(CreateRegion);
