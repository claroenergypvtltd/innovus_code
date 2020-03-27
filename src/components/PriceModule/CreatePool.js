import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
// import { CheckedSelect } from 'react-select-checked';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import { getTypes } from '../../actions/priceAction'
import { getPriceList } from '../../actions/priceAction'
import { submitPool, getPoolList } from '../../actions/poolAction'
import store from '../../store/store';
import { path } from '../../constants';
import { POOL_CREATE_SUCCESS, POOL_UPDATE_SUCCESS, PRICE_FETCH_SUCCESS } from '../../constants/actionTypes';
import { toastr } from 'react-redux-toastr';
import SelectField, { components } from "react-select";
import createClass from "create-react-class";

class CreatePool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            submitted: false,
            weightId: 0,
            weight: 0,
            updateQuantity: '',
            currentSelection: [],
            quantityUnit: '',
            PriceLists: [],
            inputValue: ''
        }
    }

    componentDidMount() {
        this.getPriceList();
    }

    componentWillReceiveProps(newProps) {
        if (newProps && newProps.priceData && newProps.priceData.Lists && newProps.priceData.Lists.datas) {
            store.dispatch({ type: PRICE_FETCH_SUCCESS, List: [] })
            let respData = newProps.priceData.Lists.datas;
            this.setState({ PriceLists: respData }, () => {
                if (this.props.location && this.props.location.state && this.props.location.state.poolId) {
                    this.setState({ poolId: this.props.location.state.poolId })
                    this.getPoolList();
                }
            })
        }

        if (this.props.location && this.props.location.state && this.props.location.state.poolId && newProps && newProps.poolData && newProps.poolData.Lists && newProps.poolData.Lists.datas && newProps.poolData.Lists.datas[0]) {
            let editData = newProps.poolData.Lists.datas[0];
            let poolAry = [];
            let rupeesUnit = editData.quantityUnit
            let dcName = []
            let dcCode = []

            editData.dcCodeDetails && editData.dcCodeDetails.map((item) => {
                if (item) {
                    dcName.push(item.name)
                    dcCode.push(item.dcCode)
                }
                return item.name
            })

            editData.pools && editData.pools.forEach((item, index) => {
                let dcName = editData.dcCodeDetails && editData.dcCodeDetails[index] && editData.dcCodeDetails[index].name ? editData.dcCodeDetails[index].name : '';
                let dcCode = editData.dcCodeDetails && editData.dcCodeDetails[index] && editData.dcCodeDetails[index].dcCode ? editData.dcCodeDetails[index].dcCode : '';
                let obj = {
                    "value": editData.productName[index] + ' - ' + dcName,
                    "label": editData.productName[index] + ' - ' + dcName,
                    "parentQuantityData": { "parentId": item.productId, "rupeesUnit": rupeesUnit, "dcCode": dcCode }
                }
                poolAry.push(obj);
            })

            this.setState({ name: editData.name, quantityUnit: editData.quantityUnit, weight: editData.quantity, currentSelection: poolAry })
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
    }

    getPoolList = () => {
        let obj = {
            poolId: this.props.location.state.poolId
        }
        this.props.getPoolList(obj);
    }

    getPriceList(type) {
        let obj = {
            pages: 0
        }
        this.props.getPriceList(obj)
    }

    listPath = () => {
        this.props.history.push({ pathname: path.pool.list, state: { poolSessionData: 'poolSessionBack' } })
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
    selectAllFunc = (data, inputValue) => {
        let searchData = []
        data && data.map((item) => {
            if (item) {
                let searchValue = item.value ? item.value.toLowerCase() : ''
                if (searchValue && searchValue.includes(inputValue.toLowerCase())) {
                    searchData.push(item)
                }
            }
        })
        this.handlePoolChange(searchData)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })
        let rupeesUnit = 0;
        if (this.state.name && this.state.currentSelection && this.state.currentSelection.length > 0) {
            let poolAry = [];
            this.state.currentSelection && this.state.currentSelection.map(item => {
                // let poolData = item.label && item.label.split('-');
                rupeesUnit = item.parentQuantityData.rupeesUnit;
                let obj = {
                    productId: item.parentQuantityData && item.parentQuantityData.parentId,
                    // dcCode: poolData[1],
                    dcCode: item.parentQuantityData && item.parentQuantityData.dcCode
                }
                poolAry.push(obj);
            })

            let obj = {
                "name": this.state.name,
                "quantity": (Number(this.state.weight) + Number(this.state.updateQuantity)),
                "quantityUnit": rupeesUnit,
                "pools": poolAry,
                "id": this.props.location && this.props.location.state && this.props.location.state.poolId
            }
            this.props.submitPool(obj);
        }
    }
    redirectPage = () => {
        this.props.history.push({ pathname: path.pool.list, state: { poolSessionData: 'poolSessionBack' } });
    }
    inputChange = (inputValue, { action }) => {
        switch (action) {
            case 'input-change':
                this.setState({ inputValue });
                return;
            case 'menu-close':
                let menuIsOpen = undefined;
                if (this.state.inputValue) {
                    menuIsOpen = true;
                }
                this.setState({ menuIsOpen });
                return;
            default:
                return;
        }
    }
    render() {
        const { errors } = this.state;
        let dropDownData = [];
        this.state.userData && this.state.userData.map((item) => {
            let obj = { "label": item.name, "value": item.id };
            dropDownData.push(obj);
        })
        // let pollData = [{ "value": "SelectAll", "label": <button onClick={() => this.selectAllFunc()}>{"Select All"}</button> }];
        let pollData = [];
        this.state.PriceLists && this.state.PriceLists.map((item) => {
            let obj = { "value": item.name + ' - ' + item.dcCodeDetails.name, "label": item.name + ' - ' + item.dcCodeDetails.name, indeterminate: true, "parentQuantityData": { "parentId": item.id, "rupeesUnit": item.productDetail.rupeesUnit, "dcCode": item.productDetail.dcCode } };
            pollData.push(obj);
        })
        let plcHolder = "";
        let showSelected = false;
        if (this.state.currentSelection && this.state.currentSelection.length > 0) {
            showSelected = true;
            plcHolder = this.state.inputValue + ' ' + this.state.currentSelection.length + ' ' + 'Selected'
        } else {
            showSelected = false;
            plcHolder = !this.state.inputValue ? "Select" : ''
        }

        const Option = createClass({
            render() {
                return (
                    <div>
                        <components.Option {...this.props}>
                            <input
                                type="checkbox"
                                checked={this.props.isSelected}
                                onChange={e => null}
                            />{" "}
                            <label>{this.props.value} </label>
                        </components.Option>
                    </div>
                );
            }
        });
        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-12">
                        <h4 className="user-title">{this.state.poolId ? window.strings['PRICE']['EDIT_POOL'] : window.strings['PRICE']['ADD_POOL']}</h4>
                        <div className="main-wrapper pt-3">
                            <div className="col-md-10">
                                <form onSubmit={this.handleSubmit} noValidate className="row m-0">
                                    <div className="form-group col-md-6">
                                        <label>{window.strings.FARMERS.NAME} *</label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                            onChange={this.handleInputChange}
                                            value={this.state.name}
                                            className={classnames('form-control')}
                                        // disabled={this.state.poolId}
                                        />
                                        {this.state.submitted && !this.state.name && <div className="mandatory">Name is required</div>}
                                    </div>
                                    <div className="form-group d-flex col-md-6">
                                        <div className="col-md-9 px-0">
                                            <label>{window.strings.PRICE.SELECT_POOL} *</label>
                                            <div className="key-count">{plcHolder}</div>
                                            <SelectField
                                                styles={{
                                                    control: base => ({
                                                        ...base,
                                                        borderColor: 'hsl(0,0%,80%)',
                                                        boxShadow: '#FE988D',
                                                        '&:hover': {
                                                            borderColor: '#FE988D'
                                                        }
                                                    }),
                                                    // showSelected &&
                                                    multiValue: base => ({
                                                        ...base,
                                                        display: 'none'
                                                    })
                                                }}
                                                placeholder={false}
                                                closeMenuOnSelect={false}
                                                isMulti
                                                components={{ Option }}
                                                options={pollData}
                                                hideSelectedOptions={false}
                                                value={this.state.currentSelection}
                                                backspaceRemovesValue={false}
                                                inputValue={this.state.inputValue}
                                                onInputChange={this.inputChange}
                                                onChange={(e) => this.handlePoolChange(e)}
                                                isClearable={true}
                                            />
                                            {/* <span className="input-group-append">
                                            <button type="button" onClick={() => this.selectAllFunc(pollData, this.state.inputValue)} className="btn btn-primary">Select All</button>
                                        </span> */}
                                        </div>
                                        <div className="col-md-2 mt-3 pt-3">
                                            <button type="button" onClick={() => this.selectAllFunc(pollData, this.state.inputValue)} className="btn btn-primary">Select All</button>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>{window.strings.CROP.TOTAL_QUANTITY} {" (Set)"}</label>
                                        <input
                                            type="number"
                                            placeholder="Available Quantity"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.weight
                                            })}
                                            name="weight"
                                            onChange={this.handleInputChange}
                                            value={this.state.weight}
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>{window.strings.CROP.UPDATE_QUANTITY}{" (Set)"}</label>
                                        <input
                                            type="number"
                                            placeholder="Increase/Decrease Quantity"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.updateQuantity
                                            })}
                                            name="updateQuantity"
                                            onChange={this.handleInputChange}
                                            onKeyPress={this.handleInputChange}
                                            value={this.state.updateQuantity}
                                            required
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
export default connect(mapStateToProps, { getPriceList, submitPool, getPoolList })(CreatePool);