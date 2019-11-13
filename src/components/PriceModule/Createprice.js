import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpecificCategory, getCategoryList, getCategoryDCCode } from '../../actions/categoryAction';
import classnames from 'classnames';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import store from '../../store/store';
import { PRICE_CREATE_SUCCESS, PRICE_UPDATE_SUCCESS } from '../../constants/actionTypes';
import { getPriceList, submitPrice } from '../../actions/priceAction'

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
            errors: {}
        }
    }


    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.priceId) {
            this.setState({ priceId: this.props.location.state.priceId })
        }
        this.setState({ weight: '', subCategoryDatas: [] }, () => {
            this.editPrice();
            this.setWeightData();
            this.getCategoryList();
        })

    }

    setWeightData() {
        let obj = [{
            "name": "Quindal",
            "id": "Quindal"
        }, {
            "name": "KG",
            "id": "Kg",
        },
        {
            "name": "Ton",
            "id": "Ton"
        }]

        this.setState({ weightDatas: obj });
    }

    editPrice() {
        if (this.props.location && this.props.location.state && this.props.location.state.priceId) {
            let obj = {
                "categoryId": this.props.location.state.priceId
            }
            this.props.getPriceList(obj).then(resp => {
                if (resp && resp.datas && resp.datas[0]) {
                    this.setState({ parentId: resp.datas[0].parentId, dcCode: resp.datas[0].dcCode }, () => {
                        getCategoryDCCode(this.state.parentId).then(resp => {
                            if (resp && resp.data && resp.data.datas) {
                                this.setState({ dcCodeData: resp.data.datas })
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
                        if (response && response.datas && response.datas[0] && response.datas[0].categoryAmount) {
                            this.setState({
                                weight: response.datas[0].categoryAmount.totalQuantity, price: response.datas[0].categoryAmount.amount,
                                weightId: response.datas[0].categoryAmount.rupeesize, boxQuantity: response.datas[0].categoryAmount.boxQuantity,
                                offer: response.datas[0].categoryAmount.discountValue, offerId: response.datas[0].categoryAmount.discountUnit
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
        this.setState({ categoryData: nextProps.getCategory })
        let showweight = 0;
        if (nextProps.categoryData && nextProps.categoryData.specificData && nextProps.categoryData.specificData.data && nextProps.categoryData.specificData.data.datas) {

            let Data = nextProps.categoryData.specificData.data;
            this.setState({ editSubCategoryDatas: Data.datas })
        }
        if (nextProps.priceData && nextProps.priceData.specificData && nextProps.priceData.specificData.datas) {
            if (nextProps.priceData.specificData.datas && nextProps.priceData.specificData.datas[0] && nextProps.priceData.specificData.datas[0].categoryAmount) {
                showweight = nextProps.priceData.specificData.datas[0].categoryAmount.totalQuantity
            }
            if (this.state.priceId) {
                this.setState({ weight: showweight })

            }
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
        this.setState({ [e.target.name]: e.target.value })
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
        this.setState({ subCategoryDatas: [], editSubCategoryDatas: [], dcCode: e.target.value, categoryId: "" }, () => {
            getCategoryDCCode(this.state.parentId, this.state.dcCode, 'getDcsubCat').then(resp => {
                if (resp && resp.data && resp.data.datas) {
                    this.setState({ subCategoryDatas: resp.data.datas })
                }
            });

            // let obj = {
            //     "categoryId": this.state.categoryId
            // }
            // this.props.getPriceList(obj);
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
        if (this.state.categoryId && this.state.price && this.state.weightId && this.state.boxQuantity) {

            let isUpdate = false;
            let flag;
            this.state.updateQuantity < 0 ? flag = 1 : flag = 0;
            if (this.props.location && this.props.location.state && this.props.location.state.priceId) {
                isUpdate = true;
            }

            let obj = {
                "categoryId": this.state.categoryId,
                "rupeesize": "RS/" + this.state.weightId,
                "amount": this.state.price,
                "boxQuantity": this.state.boxQuantity,
                "totalQuantity": this.state.weight,
                "updateQuantity": this.state.updateQuantity ? Math.abs(this.state.updateQuantity) : 0,
                "totalQuantitySize": this.state.weightId,
                "boxQuantitySize": this.state.weightId,
                "discountValue": this.state.offer,
                "discountUnit": this.state.offerId,
                "flag": flag
            }

            this.props.submitPrice(obj, isUpdate);
        }
    }
    listPath = () => {
        this.props.history.goBack();
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

        const subCategoryDropDown = this.state.priceId ? this.state.editSubCategoryDatas && this.state.editSubCategoryDatas.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        })
            : this.state.subCategoryDatas && this.state.subCategoryDatas.map((item, index) => {
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
                                            <select required name="parentId" className="form-control" value={this.state.parentId} onChange={this.handleCategoryChange}>
                                                <option value="0">Select Category</option>
                                                {categoryDropDown}
                                            </select>
                                            {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['CATEGORY']['CATEGORY_NAME'] + window.strings['ISREQUIRED']}</div>}
                                            {this.state.priceId && this.state.submitted && this.state.parentId == 0 && <div className="mandatory">{window.strings['CATEGORY']['CATEGORY_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-4 px-0">
                                            <label>{window.strings['CATEGORY']['DC_CODE'] + ' *'}</label>
                                            <select required name="dcCode" className="form-control" value={this.state.dcCode} onChange={this.handleDcCodeSubCategory}>
                                                <option value="-" >Select DC Code</option>
                                                {dcCodeData}
                                            </select>
                                            {this.state.submitted && !this.state.dcCode && <div className="mandatory">{window.strings['CATEGORY']['DC_CODE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label>{window.strings['CATEGORY']['SUB_CATEGORY'] + ' *'}</label>
                                            <select required name="categoryId" className="form-control" value={this.state.categoryId} onChange={this.handleSubCategory}>
                                                <option value="0">Select SubCategory </option>
                                                {subCategoryDropDown}
                                            </select>
                                            {this.state.submitted && !this.state.categoryId && <div className="mandatory">{window.strings['CATEGORY']['SUB_CATEGORY'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        {/* </div> */}

                                        {/* <div className="col-md-4 row"> */}
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

                                            {this.state.submitted && !this.state.weightId && <div className="mandatory">{window.strings['CROP']['WEIGHT'] + ' ' + window.strings['PRICE']['TYPE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        {/* </div> */}

                                        {/* <div className="col-md-4 row"> */}
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
                                        {/* </div> */}

                                        {/* <div className="col-md-4 row"> */}
                                        <div className="form-group col-md-6">
                                            <label>{window.strings.CROP.BOX_QUANTITY + ' *'}</label>
                                            <input type="number"
                                                placeholder="Box Quantity"
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


                                        <div className="form-group col-md-6">
                                            <label>{window.strings.PRICE.OFFER}</label>
                                            <input type="number"
                                                placeholder="Offer"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.offer
                                                })}
                                                name="offer"
                                                onChange={this.handleInputChange}
                                                value={this.state.offer}
                                                required

                                            />
                                            {/* {this.state.submitted && !this.state.offer && <div className="mandatory">{window.strings['PRICE']['OFFER'] + window.strings['ISREQUIRED']}</div>} */}
                                        </div>


                                        <div className="form-group col-md-6 ">
                                            <label>{window.strings.PRICE.TYPE}</label>

                                            <select required name="offerId" className="form-control" value={this.state.offerId} onChange={this.handleInputChange} >
                                                <option value="0">Select</option>
                                                <option value="1">Currency</option>
                                                <option value="2">Percentage</option>
                                            </select>
                                            {/* {this.state.submitted && !this.state.offerId && <div className="mandatory">{window.strings['PRICE']['OFFER'] + ' ' + window.strings['PRICE']['TYPE'] + window.strings['ISREQUIRED']}</div>} */}
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
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    categoryData: state.category,
    getCategory: state.category && state.category.Lists ? state.category.Lists : [],
    priceData: state.price ? state.price : {}
})


export default connect(mapStateToProps, { getCategoryList, getSpecificCategory, getPriceList, submitPrice })(CreatePrice)