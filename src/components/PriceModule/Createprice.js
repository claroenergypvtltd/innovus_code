import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpecificCategory, getCategoryList, getCategoryDCCode } from '../../actions/categoryAction';
import classnames from 'classnames';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import store from '../../store/store';
import { PRICE_CREATE_SUCCESS, PRICE_UPDATE_SUCCESS, PRICE_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes';
import { getPriceList, submitPrice, getTypes } from '../../actions/priceAction'
import { toastr } from '../../services/toastr.services'

class CreatePrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            weight: '',
            price: '',
            boxQuantity: '',
            categoryId: '',
            parentId: '',
            offer: '',
            priceData: {},
            weightDatas: [],
            errors: {},
            weightId: 0,
            offerId: 0,
            categoryData: [],
            flag: '',
            offerArray: [{ quantity: '', offer: '', type: '' }],
            removeArray: []
        }
    }


    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.priceId) {
            this.setState({ priceId: this.props.location.state.priceId })
        }
        this.setState({ weight: '', subCategoryDatas: [] }, () => {
            this.getWeightDatas();
            this.editPrice();
            this.getCategoryList();
        })

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

    setWeightData() {
        let typeArray = [];
        this.state.typeDatas && this.state.typeDatas.map(item => {
            let obj = {
                "name": item.name,
                "id": item.name,
            }
            typeArray.push(obj);
        })
        this.setState({ weightDatas: typeArray });
    }

    editPrice() {
        if (this.props.location && this.props.location.state && this.props.location.state.priceId) {
            let obj = {
                "categoryId": this.props.location.state.priceId
            }
            this.props.getPriceList(obj).then(resp => {
                if (resp && resp.datas && resp.datas[0]) {
                    let priceDatas = resp.datas[0]
                    let contactArray = [];

                    priceDatas && priceDatas.productOffers && priceDatas.productOffers.map((item, index) => {
                        if (index <= 3) {
                            let respObject = { id: item.id, quantity: item.quantity, offer: item.discountValue, type: item.discountUnit };
                            contactArray.push(respObject)
                        }
                    })

                    this.setState({
                        parentId: priceDatas.parentId, dcCode: priceDatas.productDetail.dcCode,
                        offerArray: contactArray.length == 0 ? this.state.offerArray : contactArray
                    }, () => {
                        getCategoryDCCode(this.state.parentId).then(resp => {
                            if (resp && resp.data && resp.data.datas) {
                                let respData = resp.data.datas;
                                this.setState({ dcCodeData: respData })
                            }
                        });
                    })
                    let obj = {
                        "categoryId": resp.datas[0].parentId
                    }
                    this.props.getSpecificCategory(obj, true);

                    let subCatId = {
                        "categoryId": resp.datas[0].id
                    }

                    this.props.getPriceList(subCatId).then(response => {
                        this.setState({ categoryId: resp.datas[0].id });
                        if (response && response.datas && response.datas[0] && response.datas[0].productDetail) {
                            let respData = response.datas[0].productDetail;
                            this.setState({
                                weight: respData.totalQuantity, price: respData.amount,
                                weightId: respData.rupeesize, boxQuantity: respData.boxQuantity,
                                offer: respData.discountValue == 0 ? '' : respData.discountValue,
                                offerId: respData.discountUnit, subCategoryLabel: response.datas[0].name
                            })
                        }
                    })
                }
            });
        }
    }
    componentDidUpdate(preProps) {
        if (preProps.priceData != this.props.priceData) {
            if (preProps.priceData && preProps.priceData.categoryAmount) {
                this.setState({ weight: preProps.priceData.categoryAmount.rupeesize, price: preProps.priceData.categoryAmount.amount });
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ categoryData: nextProps.getCategory.datas })
        let showweight = 0;
        if (nextProps.categoryData && nextProps.categoryData.specificData && nextProps.categoryData.specificData.data && nextProps.categoryData.specificData.data.datas) {
            let Data = nextProps.categoryData.specificData.data;
            this.setState({ editSubCategoryDatas: Data.datas })
        }
        if (nextProps.priceData && nextProps.priceData.specificData && nextProps.priceData.specificData.datas) {
            if (nextProps.priceData.specificData.datas && nextProps.priceData.specificData.datas[0] && nextProps.priceData.specificData.datas[0].productDetail) {
                showweight = nextProps.priceData.specificData.datas[0].productDetail.totalQuantity ? nextProps.priceData.specificData.datas[0].productDetail.totalQuantity : 0
            }
            store.dispatch({ type: PRICE_SPECIFIC_DATA_SUCCESS, specificData: "" })
            this.setState({ weight: showweight })
        }


        if (nextProps.priceData && nextProps.priceData.createdData == "200") {
            store.dispatch({ type: PRICE_CREATE_SUCCESS, createdData: '' });
            this.listPath();
        }

        if (nextProps.priceData && nextProps.priceData.updatedData == "200") {
            store.dispatch({ type: PRICE_UPDATE_SUCCESS, updatedData: '' })
            this.listPath();
        }
    }
    handleInputChange = (e) => {
        e.charCode == 45 || e.charCode == 43 || (e.target.name != "updateQuantity" && e.target.value < 0) || (e.target.name != "price" && e.target.value.includes('.')) ? e.target.value = '' : this.setState({ [e.target.name]: e.target.value })
    }
    handleCategoryChange = (e) => {
        this.setState({ weight: '', dcCode: '', dcCodeData: [], subCategoryDatas: [], editSubCategoryDatas: [], parentId: e.target.value, categoryId: '' }, () => {
            getCategoryDCCode(this.state.parentId).then(resp => {
                if (resp && resp.data && resp.data.datas) {
                    this.setState({ dcCodeData: resp.data.datas })
                }
            });
        })
    }
    handleDcCodeSubCategory = (e) => {
        this.setState({ subCategoryDatas: [], editSubCategoryDatas: [], dcCode: e.target.value, categoryId: "", weight: "" }, () => {
            getCategoryDCCode(this.state.parentId, this.state.dcCode, 'getDcsubCat').then(resp => {
                if (resp && resp.data && resp.data.datas) {
                    this.setState({ subCategoryDatas: resp.data.datas })
                }
            });
        })
    }
    handleSubCategory = (e) => {
        this.setState({ categoryId: e.target.value }, () => {

            let obj = {
                "categoryId": this.state.categoryId
            }
            this.props.getPriceList(obj);
        })
    }
    getCategoryList = () => {
        let user = {};
        this.props.getCategoryList(user);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        })
        let isValid = true;
        let isQuantityValid = true;
        this.state.offerArray.map((item, index) => {
            if (this.state.price >= item.offer || item.type == 2 && parseInt(item.offer) <= 100 || !item.offer && item.type == '' || parseInt(item.offer)) {
                if ((item.type == 2 && item.offer <= 100) || (item.type == 1 && parseInt(this.state.price) >= parseInt(item.offer)) || !item.offer && !item.type || item.type == '') {
                    if (this.state.categoryId && this.state.price && this.state.weightId != 0 && this.state.boxQuantity) {
                        let weightValue;

                        if (item.quantity || item.offer || item.type) {
                            if (item.quantity && item.offer && item.type) {
                                if (Number(item.quantity) % this.state.boxQuantity == 0) {
                                    // isValid = true
                                    // this.props.submitPrice(obj, isUpdate);                            
                                } else {
                                    isValid = false
                                    toastr.error("Please increment Offer Quantity in multiple of box quantity");
                                    return;
                                }
                            } else {
                                isValid = false
                                return;
                            }
                        }

                        if (this.state.weight == 0 && this.state.updateQuantity) {
                            if (this.state.updateQuantity < 0) {
                                isValid = false
                                toastr.error("Available Quantity is Zero.Cannot Decrement.Please Enter Positive Value.");
                                return;
                            } else {
                                weightValue = 1;
                            }
                        }
                        else if (this.state.weight != 0 && this.state.updateQuantity) {
                            if (this.state.updateQuantity < 0) {
                                if (Math.abs(this.state.updateQuantity) > this.state.weight) {
                                    isValid = false
                                    toastr.error("Decrement Quantity should be Lesser Or equal to Available quantity.");
                                    return;
                                } else {
                                    weightValue = 1;
                                }
                            } else {
                                weightValue = 1;
                            }
                        }

                        if (this.state.updateQuantity || item.offer || item.type != '') {
                            if (this.state.updateQuantity && item.offer == '' && !item.type) {
                                if (weightValue == 1) {
                                    if (Number(this.state.updateQuantity) % this.state.boxQuantity == 0) {
                                        // isValid = true
                                        // this.props.submitPrice(obj, isUpdate);
                                    } else {
                                        toastr.error("Please increment/decrement in multiple of box quantity")
                                        isValid = false
                                        return;
                                    }
                                }
                            }
                            else if (this.state.updateQuantity && item.type != '' && item.offer) {
                                if (weightValue == 1) {
                                    if (Number(this.state.updateQuantity) % this.state.boxQuantity == 0) {
                                        // isValid = true
                                        // this.props.submitPrice(obj, isUpdate);
                                    } else {
                                        isValid = false;
                                        isQuantityValid = false;
                                        // toastr.error("Please increment/decrement in multiple of box quantity") //
                                        return;
                                    }
                                }
                            }
                            else if (!this.state.updateQuantity && !item.offer && !item.type) {
                                // isValid = true
                                // this.props.submitPrice(obj, isUpdate);
                            }
                            else if (item.type == 0 && this.state.updateQuantity && !item.offer) {
                                if (weightValue == 1) {
                                    if (Number(this.state.updateQuantity) % this.state.boxQuantity == 0) {
                                        // isValid = true
                                        // this.props.submitPrice(obj, isUpdate);
                                    } else {
                                        isValid = false
                                        toastr.error("Please increment/decrement in multiple of box quantity");
                                        return;
                                    }
                                }
                            }
                            else if (item.offer && item.type == 2) {
                                if (parseInt(item.offer) <= 100) {
                                    // isValid = true
                                    // this.props.submitPrice(obj, isUpdate);
                                }
                            }
                            else if (item.offer && item.type == 1) {
                                if (parseInt(item.offer) <= parseInt(this.state.price)) {
                                    // isValid = true
                                    // this.props.submitPrice(obj, isUpdate);
                                }
                            } else if (item.offer && item.type == 0) {
                                isValid = false
                                toastr.error("Select valid offer");
                                return;
                            }
                        }
                        else {
                            // isValid = true
                            // this.props.submitPrice(obj, isUpdate);
                        }
                    }
                }
                else {
                    isValid = false
                    item.type == 1 && parseInt(this.state.price) < parseInt(item.offer) || !item.offer ? toastr.error("Select valid offer") : toastr.error("Select valid offer type");
                    return;
                }
            }
        })

        if (!isQuantityValid) {
            toastr.error("Please increment/decrement in multiple of box quantity")
        }
        if (isValid == true && parseInt(this.state.categoryId) && this.state.weightId != 0 && this.state.price && this.state.boxQuantity && this.state.dcCode) {
            let flag;
            this.state.updateQuantity < 0 ? flag = 1 : flag = 0;

            let isUpdate = false;
            if (this.props.location && this.props.location.state && this.props.location.state.priceId) {
                isUpdate = true;
            }

            let arrayData = [];

            this.state.offerArray && this.state.offerArray.map(item => {
                let sendObj = {}
                sendObj.id = item.id;
                if (item.quantity && item.offer && item.type) {
                    sendObj.quantity = item.quantity;
                    sendObj.discountValue = item.offer;
                    sendObj.discountUnit = item.type;
                    sendObj.quantityUnit = this.state.weightId
                } else {
                    sendObj.isDeleted = 1
                }
                arrayData.push(sendObj);
            });

            var isDuplicate = false;
            var valueArr = this.state.offerArray.map(function (item) {
                if (item.quantity) {
                    return parseInt(item.quantity)
                }
            });
            isDuplicate = valueArr && valueArr.some(function (item, idx) {
                return valueArr.indexOf(item) != idx
            });
            this.state.removeArray && this.state.removeArray.map(item => {
                arrayData.push(item);
            })
            let priceVal = Number(this.state.price)
            let obj = {
                "id": this.state.categoryId,
                "rupeesize": "RS/" + this.state.weightId,
                "amount": priceVal.toFixed(1),
                "boxQuantity": this.state.boxQuantity,
                "totalQuantity": this.state.weight,
                "updateQuantity": this.state.updateQuantity ? Math.abs(this.state.updateQuantity) : 0,
                "totalQuantityUnit": this.state.weightId,
                "boxQuantityUnit": this.state.weightId,
                "discountValue": this.state.offer ? this.state.offer : 0,
                // "discountUnit": this.state.offerId == 0 ? '' : this.state.offerId,
                "productId": this.state.categoryId,
                "flag": flag,
                "dcCode": this.state.dcCode,
                "offer": arrayData
            }

            if (!isDuplicate) {
                this.props.submitPrice(obj, isUpdate);
            } else {
                toastr.error("Please remove duplicate quantity")
            }

        } else {
            if (isValid == true) {
                toastr.error("Fields are Invalid or Missing")
            }
        }
    }


    listPath = () => {
        this.props.history.push({ pathname: path.price.list, state: { priceSearchDatas: "backTrue" } });
    }

    handleChangeQuantity = (idx) => (evt) => {
        const newContact = this.state.offerArray.map((offerArrayolder, sidx) => {
            if (idx !== sidx) return offerArrayolder;
            return { ...offerArrayolder, quantity: evt.target.value > 0 ? parseInt(evt.target.value) : '' };
        });

        this.setState({ offerArray: newContact });
    }

    handleChangeOffer = (idx) => (evt) => {
        const newContact = this.state.offerArray.map((offerArrayolder, sidx) => {
            if (idx !== sidx) return offerArrayolder;
            return { ...offerArrayolder, offer: evt.target.value > 0 ? parseInt(evt.target.value) : '' };
        });
        this.setState({ offerArray: newContact });
    }

    handleChangeType = (idx) => (evt) => {
        const newContact = this.state.offerArray.map((offerArrayolder, sidx) => {
            // if (idx !== sidx) return offerArrayolder;
            return { ...offerArrayolder, type: evt.target.value };
        });

        this.setState({ offerArray: newContact });
    }

    handleRemoveContact = (idx, removeId) => () => {
        let removeArray = this.state.removeArray;
        if (removeId) {
            let obj = {
                "id": removeId,
                "isDeleted": 1
            }
            removeArray.push(obj);
        }

        this.setState({
            offerArray: this.state.offerArray.filter((s, sidx) => idx !== sidx)
        });
    }

    handleAddofferArray = () => {
        this.setState({
            offerArray: this.state.offerArray.concat([{ quantity: '', offer: '', type: this.state.offerArray[0].type }])
        });
    }

    render() {
        const { errors } = this.state;
        const categoryDropDown = this.state.categoryData && this.state.categoryData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });
        const dcCodeData = this.state.dcCodeData && this.state.dcCodeData.map((item, index) => {
            if (item.dcCode) {
                return <option key={index}
                    value={item.dcCode}> {item.dcCode}</option>
            }
        });

        const subCategoryDropDown =
            this.state.subCategoryDatas && this.state.subCategoryDatas.map((item, index) => {
                return <option key={index}
                    value={item.id}> {item.name}</option>
            });

        const weightDropDown = this.state.weightDatas && this.state.weightDatas.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });
        const priceDropDown = this.state.weightDatas && this.state.weightDatas.map((item, index) => {
            return <option key={index}
                value={item.id}> {"RS / " + item.name}</option>
        });
        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-12">
                        <h4 className="user-title">{this.state.priceId ? window.strings['PRICE']['EDITTITLE'] : window.strings['PRICE']['CREATETITLE']}</h4>
                        <div className="">
                            <div className="main-wrapper pt-3">
                                <div className="col-md-10 add-price">
                                    <form onSubmit={this.handleSubmit} noValidate className="row m-0">

                                        {/* <div className="col-md-4 row"> */}
                                        <div className="form-group col-md-4">
                                            <label>{window.strings['CATEGORY']['CATEGORY_NAME'] + ' *'}</label>
                                            <select required name="parentId" className="form-control" value={this.state.parentId} onChange={this.handleCategoryChange} disabled={this.state.priceId}>
                                                <option value="0">Select Category</option>
                                                {categoryDropDown}
                                            </select>
                                            {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['CATEGORY']['CATEGORY_NAME'] + window.strings['ISREQUIRED']}</div>}
                                            {this.state.priceId && this.state.submitted && this.state.parentId == 0 && <div className="mandatory">{window.strings['CATEGORY']['CATEGORY_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-4 px-0">
                                            <label>{window.strings['CATEGORY']['DC_CODE'] + ' *'}</label>
                                            <select required name="dcCode" className="form-control" value={this.state.dcCode} onChange={this.handleDcCodeSubCategory} disabled={this.state.priceId}>
                                                <option value="-" >Select DC Code</option>
                                                {dcCodeData}
                                            </select>
                                            {this.state.submitted && !this.state.dcCode && <div className="mandatory">{window.strings['CATEGORY']['DC_CODE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label>{window.strings['CATEGORY']['SUB_CATEGORY'] + ' *'}</label>
                                            <select required name="categoryId" className="form-control" value={this.state.categoryId} onChange={this.handleSubCategory} disabled={this.state.priceId}>
                                                {!this.state.priceId && <option value="0">Select SubCategory </option>}
                                                {this.state.priceId && <option value={this.state.subCategoryLabel} selected>{this.state.subCategoryLabel}</option>}
                                                {!this.state.priceId && subCategoryDropDown}
                                            </select>
                                            {this.state.submitted && !parseInt(this.state.categoryId) && <div className="mandatory">{window.strings['CATEGORY']['SUB_CATEGORY'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-4">
                                            <label>{window.strings.CROP.TOTAL_QUANTITY}</label>
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
                                            {/* {this.state.submitted && !this.state.weight && <div className="mandatory">{window.strings['CROP']['WEIGHT'] + window.strings['ISREQUIRED']}</div>} */}
                                        </div>

                                        <div className="form-group col-md-4 px-0">
                                            <label>{window.strings.CROP.UPDATE_QUANTITY}</label>
                                            <input
                                                type="number"
                                                placeholder="Increase/Decrease Quantity"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.weight
                                                })}
                                                name="updateQuantity"
                                                onChange={this.handleInputChange}
                                                onKeyPress={this.handleInputChange}
                                                value={this.state.updateQuantity}
                                                required
                                            />
                                            {/* {this.state.submitted && !this.state.updateQuantity && <div className="mandatory">{window.strings['CROP']['UPDATE_QUANTITY'] + window.strings['ISREQUIRED']}</div>} */}
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label>{window.strings.PRICE.TYPE + ' *'}</label>
                                            <select required name="weightId" className="form-control" value={this.state.weightId} onChange={this.handleInputChange} Z>
                                                <option value="0">Select</option>
                                                {weightDropDown}
                                            </select>
                                            {this.state.submitted && this.state.weightId == 0 && <div className="mandatory">{window.strings['CROP']['WEIGHT'] + ' ' + window.strings['PRICE']['TYPE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label>{window.strings.CROP.PRICE + ' *'}</label>
                                            <input type="number"
                                                placeholder="Price"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.price
                                                })}
                                                name="price"
                                                min="0"
                                                onChange={this.handleInputChange}
                                                value={this.state.price}
                                                required
                                            />
                                            {this.state.submitted && !this.state.price && <div className="mandatory">{window.strings['CROP']['PRICE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6 ">
                                            <label>{window.strings.PRICE.TYPE + ' *'}</label>
                                            <select required name="weightId" className="form-control" value={this.state.weightId} onChange={this.handleInputChange} disabled>
                                                <option value="0">Select</option>
                                                {priceDropDown}
                                            </select>
                                            {this.state.submitted && !this.state.weightId && <div className="mandatory">{window.strings['CROP']['PRICE'] + ' ' + window.strings['PRICE']['TYPE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6">
                                            <label>{window.strings.CROP.SET_QUANTITY + ' *'}</label>
                                            <input type="number"
                                                placeholder="Set Quantity"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.boxQuantity
                                                })}
                                                name="boxQuantity"
                                                onChange={this.handleInputChange}
                                                value={this.state.boxQuantity}
                                                required

                                            />
                                            {this.state.submitted && !this.state.boxQuantity && <div className="mandatory">{window.strings['CROP']['BOX_QUANTITY'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group col-md-6 ">
                                            <label>{window.strings.PRICE.TYPE + ' *'}</label>
                                            <select required name="weightId" className="form-control" value={this.state.weightId} onChange={this.handleInputChange} disabled>
                                                <option value="0">Select</option>
                                                {weightDropDown}
                                            </select>
                                            {this.state.submitted && !this.state.weightId && <div className="mandatory">{window.strings['CROP']['BOX_QUANTITY'] + ' ' + window.strings['PRICE']['TYPE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        {this.state.offerArray.map((offerArray, idx) => (
                                            <div className="col-md-12">
                                                <div className="form-group row" key={idx + 1}>
                                                    <div className="col-md-4">
                                                        <label>{window.strings.PRICE.QUANTITY} {idx + 1} </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder={`Quantity ${idx + 1} `}
                                                            value={offerArray.quantity}
                                                            onChange={this.handleChangeQuantity(idx)}
                                                            required
                                                        />
                                                        {this.state.submitted && (offerArray.type || offerArray.offer) && !offerArray.quantity && <div className="mandatory">{window.strings['PRICE']['QUANTITY'] + window.strings['ISREQUIRED']}</div>}
                                                        {this.state.submitted && offerArray.type == 1 && (parseInt(offerArray.quantity) % parseInt(this.state.boxQuantity) != 0) && offerArray.quantity && <div className="mandatory">Please enter valid Quantity</div>}
                                                        {this.state.submitted && offerArray.type == 2 && offerArray.quantity > 100 && <div className="mandatory">Please enter valid Quantity</div>}

                                                    </div>
                                                    {/* <div className="form-group col-md-4" key={idx + 1}> */}
                                                    <div className="col-md-4 px-0">
                                                        <label>{window.strings.PRICE.OFFER} {idx + 1} </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            placeholder={`Offer ${idx + 1} `}
                                                            value={offerArray.offer}
                                                            onChange={this.handleChangeOffer(idx)}
                                                            required
                                                        />
                                                        {this.state.submitted && (offerArray.quantity || offerArray.type) && !offerArray.offer && <div className="mandatory">{window.strings['PRICE']['OFFER'] + window.strings['ISREQUIRED']}</div>}
                                                        {this.state.submitted && offerArray.type == 1 && (parseInt(offerArray.offer) > parseInt(this.state.price)) && <div className="mandatory">Please enter valid offer</div>}
                                                        {this.state.submitted && offerArray.type == 2 && offerArray.offer > 100 && <div className="mandatory">Please enter valid offer</div>}

                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>{window.strings.PRICE.TYPE} {idx + 1} </label>
                                                        <select required name="offerId" className="form-control" value={offerArray.type} onChange={this.handleChangeType(idx)} disabled={idx != 0}>
                                                            <option value="">Select</option>
                                                            <option value="1">Currency</option>
                                                            <option value="2">Percentage</option>
                                                        </select>
                                                        {(this.state.submitted && (offerArray.offer || offerArray.quantity) && !offerArray.type) ? <div className="mandatory">{window.strings['PRICE']['OFFER'] + window.strings['PRICE']['TYPE'] + window.strings['ISREQUIRED']}</div> : ''}
                                                        <div className="add-del">
                                                            {idx == 0 && this.state.offerArray.length <= 3 && <button type="button" onClick={this.handleAddofferArray} className="btn-outline-success rounded-circle add-btn mr-2"><i class="fa fa-plus" aria-hidden="true"></i></button>}
                                                            {this.state.offerArray.length !== 1 && <button type="button" onClick={this.handleRemoveContact(idx, offerArray.id)} className="btn-outline-danger rounded-circle del-btn"><i class="fa fa-minus" aria-hidden="true"></i></button>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
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
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    categoryData: state.category,
    getCategory: state.category && state.category.Lists ? state.category.Lists : [],
    priceData: state.price ? state.price : {}
})

export default connect(mapStateToProps, { getCategoryList, getSpecificCategory, getPriceList, submitPrice })(CreatePrice)