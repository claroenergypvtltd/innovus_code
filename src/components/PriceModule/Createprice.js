import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSpecificCategory, getCategoryList } from '../../actions/categoryAction';
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
            categoryId: '',
            parentId: '',
            priceData: {},
            weightDatas: [],
            errors: {}
        }
    }


    componentDidMount() {
        this.editPrice();
        this.setWeightData();
        this.getCategoryList();
    }

    setWeightData() {
        let obj = [{
            "name": "Quindal",
            "id": "Quindal"
        }, {
            "name": "KG",
            "id": "KG",
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
                    this.setState({ parentId: resp.datas[0].parentId })

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
                            this.setState({ weight: response.datas[0].categoryAmount.totalQuantitySize, price: response.datas[0].categoryAmount.amount, weightId: response.datas[0].categoryAmount.rupeesize })
                        }
                    })
                }
            });
        }
    }


    componentDidUpdate(preProps) {
        debugger;
        if (preProps.priceData != this.props.priceData) {
            if (preProps.priceData && preProps.priceData.categoryAmount) {
                this.setState({ weight: preProps.priceData.categoryAmount.rupeesize, price: preProps.priceData.categoryAmount.amount });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ categoryData: nextProps.getCategory })

        if (nextProps.categoryData && nextProps.categoryData.specificData && nextProps.categoryData.specificData.data && nextProps.categoryData.specificData.data.datas) {
            debugger;
            let Data = nextProps.categoryData.specificData.data;
            this.setState({ subCategoryDatas: Data.datas })
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
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCategoryChange = (e) => {
        this.setState({ parentId: e.target.value }, () => {

            let obj = {
                "categoryId": this.state.parentId
            }
            this.props.getSpecificCategory(obj, true);
        })
    }

    handleSubCategory = (e) => {
        this.setState({ categoryId: e.target.value }, () => {
            debugger;
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

        if (this.state.categoryId && this.state.weight && this.state.price && this.state.weightId) {

            let isUpdate = false;
            if (this.props.location && this.props.location.state && this.props.location.state.priceId) {
                isUpdate = true;
            }

            let obj = {
                "categoryId": this.state.categoryId,
                "rupeesize": "RS/" + this.state.weightId,
                "amount": this.state.price,
                "totalQuantity": this.state.weight,
                "totalQuantitySize": this.state.weightId
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

        const subCategoryDropDown = this.state.subCategoryDatas && this.state.subCategoryDatas.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        const weightDropDown = this.state.weightDatas && this.state.weightDatas.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-12">
                        <h3>{this.state.categoryId ? window.strings['PRICE']['EDITTITLE'] : window.strings['PRICE']['CREATETITLE']}</h3>
                        <div className="">
                            <div className="main-wrapper pt-3">
                                <div className="col-md-8 add-price">
                                    <form onSubmit={this.handleSubmit} noValidate className="row m-0">

                                    {/* <div className="col-md-4 row"> */}
                                       <div className="form-group col-md-6">
                                            <label>{window.strings['CATEGORY']['CATEGORY_NAME']}</label>
                                            <select required name="parentId" className="form-control" value={this.state.parentId} onChange={this.handleCategoryChange}>
                                                <option value="0">Select Category</option>
                                                {categoryDropDown}
                                            </select>
                                            {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Crop Category</label>
                                            <select required name="categoryId" className="form-control" value={this.state.categoryId} onChange={this.handleSubCategory}>
                                                <option value="0">Select SubCategory </option>
                                                {subCategoryDropDown}
                                            </select>
                                            {this.state.submitted && !this.state.categoryId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                    {/* </div> */}

                                    {/* <div className="col-md-4 row"> */}
                                        <div className="form-group col-md-6">
                                            <label>{window.strings.CROP.WEIGHT}</label>
                                            <input
                                                type="text"
                                                placeholder="Weight"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.weight
                                                })}
                                                name="weight"
                                                onChange={this.handleInputChange}
                                                value={this.state.weight}
                                                required
                                            />
                                            {this.state.submitted && !this.state.weight && <div className="mandatory">{window.strings['CROP']['WEIGHT'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-6 sub-price">
                                            <select required name="weightId" className="form-control" value={this.state.weightId} onChange={this.handleInputChange}>
                                                <option value="0">Select</option>
                                                {weightDropDown}
                                            </select>

                                            {this.state.submitted && !this.state.weightId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                    {/* </div> */}

                                    {/* <div className="col-md-4 row"> */}
                                        <div className="form-group col-md-6">
                                            <label>{window.strings.CROP.PRICE}</label>
                                            <input type="text"
                                                placeholder="price"
                                                className={classnames('form-control', {
                                                    'is-invalid': errors.price
                                                })}
                                                name="price"
                                                onChange={this.handleInputChange}
                                                value={this.state.price}
                                                required

                                            />
                                            {this.state.submitted && !this.state.price && <div className="mandatory">{window.strings['CROP']['PRICE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                        <div className="form-group col-md-6 sub-price">
                                            <select required name="weightId" className="form-control" value={this.state.weightId} onChange={this.handleInputChange}>
                                                <option value="0">Select</option>
                                                {weightDropDown}
                                            </select>
                                            {this.state.submitted && !this.state.weightId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>
                                    {/* </div> */}

                                        <div className="col-md-12 bottom-section">
                                                <button type="button" className="btn btn-default" onClick={this.listPath}>{window.strings.CANCEL}</button>
                                                <button type="submit" className="btn btn-primary" disabled={this.state.loading}>{window.strings.SUBMIT}</button>

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


const mapStateToProps = (state) => ({
    categoryData: state.category,
    getCategory: state.category && state.category.Lists ? state.category.Lists : [],
    priceData: state.price ? state.price : {}
})


export default connect(mapStateToProps, { getCategoryList, getSpecificCategory, getPriceList, submitPrice })(CreatePrice)