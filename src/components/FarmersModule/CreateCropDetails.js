import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import '../../assets/css/login.scss';
import { SubmitCropDetails } from '../../actions/FarmersAction'
import { getCategoryList, getSpecificCategory } from '../../actions/categoryAction';

class CreateCropDetails extends Component {

    constructor(props) {

        super(props);
        this.state = {
            submitted: false,
            cropName: '',
            type: '',
            sowDate: '',
            harvestDate: '',
            quantity: '',
            image: '',
            categoryId: '',
            subCategoryId: '',
            farmId: '',
            errors: {}
        }
    }


    componentDidMount() {
        if (this.props.location && this.props.location.state && this.props.location.state.farmId) {
            this.setState({ farmId: this.props.location.state.farmId })
        }
        this.props.getCategoryList();
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ categoryData: nextProps.getCategory })
    }


    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeCategory = (e) => {
        this.setState({ categoryId: e.target.value }, () => {

            let obj = {
                "categoryId": this.state.categoryId
            }

            this.props.getSpecificCategory(obj, true).then(resp => {
                if (resp) {
                    this.setState({ subCategoryData: resp.data && resp.data.datas })
                }
            })
        })
    }

    pageRedirect = () => {
        this.props.history.goBack();
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.setState({
            submitted: true
        }, () => {
            let obj = {
                "farmId": this.state.farmId,
                "categoryId": this.state.subCategoryId,
                "cropType": this.state.type,
                "expectedHarvestDateStr": this.state.harvestDate,
                "sowDateStr": this.state.sowDate,
                "expectedQuantity": this.state.quantity
            }

            this.props.SubmitCropDetails(obj).then(resp => {
                if (resp && resp.data) {
                    this.pageRedirect();
                }
            })
        })
    }

    render() {
        const { errors } = this.state;

        const categoryDropDown = this.state.categoryData && this.state.categoryData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        const subCategoryDropDown = this.state.subCategoryData && this.state.subCategoryData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-10">
                        <h3>{window.strings['FARMERS']['CROP_DETAILS']}</h3>
                        <div className="col-md-6 ">
                            <div className="p-5 clearfix">
                                <div className="">
                                    <form onSubmit={this.handleSubmit} noValidate>

                                        <div className="form-group pt-3">
                                            <label>{window.strings['CATEGORY']['CATE_NAME']}</label>

                                            <select required name="categoryId" className="form-control col-xs-6 col-sm-4 " value={this.state.categoryId} onChange={this.onChangeCategory}>
                                                <option value="0">{window.strings['CATEGORY']['CATE_NAME']}</option>
                                                {categoryDropDown}
                                            </select>
                                            {this.state.submitted && !this.state.categoryId && <div className="mandatory">{window.strings['CATEGORY']['CATE_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group pt-3">

                                            <label>{window.strings['CROP']['CROP_NAME']}</label>
                                            <select required name="subCategoryId" className="form-control col-xs-6 col-sm-4 " value={this.state.subCategoryId} onChange={this.handleInputChange}>
                                                <option value="0">{window.strings['CROP']['CROP_NAME']}</option>
                                                {subCategoryDropDown}
                                            </select>

                                            {this.state.submitted && !this.state.subCategoryId && <div className="mandatory">{window.strings['CROP']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['CROP']['CROP_TYPE']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['CROP']['CROP_TYPE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.type
                                                })}
                                                name="type"
                                                onChange={this.handleInputChange}
                                                value={this.state.type}
                                                required

                                            />
                                            {this.state.submitted && !this.state.type && <div className="mandatory">{window.strings['CROP']['CROP_TYPE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['SOW_DATE']}</label>

                                            <input
                                                type="date"
                                                placeholder={window.strings['FARMERS']['SOW_DATE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.sowDate
                                                })}
                                                name="sowDate"
                                                onChange={this.handleInputChange}
                                                value={this.state.sowDate}
                                                required

                                            />
                                            {this.state.submitted && !this.state.sowDate && <div className="mandatory">{window.strings['FARMERS']['SOW_DATE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['HARVEST_DATE']}</label>

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
                                            {this.state.submitted && !this.state.harvestDate && <div className="mandatory">{window.strings['FARMERS']['HARVEST_DATE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['SELLING_PRICE']}</label>

                                            <input
                                                type="number"
                                                placeholder={window.strings['FARMERS']['SELLING_PRICE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.sellingPrice
                                                })}
                                                name="sellingPrice"
                                                onChange={this.handleInputChange}
                                                value={this.state.sellingPrice}
                                                required

                                            />
                                            {this.state.submitted && !this.state.sellingPrice && <div className="mandatory">{window.strings['FARMERS']['SELLING_PRICE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>



                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['QUANTITY']}</label>

                                            <input
                                                type="number"
                                                placeholder={window.strings['FARMERS']['QUANTITY']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.quantity
                                                })}
                                                name="quantity"
                                                onChange={this.handleInputChange}
                                                value={this.state.quantity}
                                                required

                                            />
                                            {this.state.submitted && !this.state.quantity && <div className="mandatory">{window.strings['FARMERS']['QUANTITY'] + window.strings['ISREQUIRED']}</div>}
                                        </div>




                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['TOTAL_VALUE']}</label>

                                            <input
                                                type="number"
                                                placeholder={window.strings['FARMERS']['TOTAL_VALUE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.totalValue
                                                })}
                                                name="totalValue"
                                                onChange={this.handleInputChange}
                                                value={this.state.totalValue}
                                                required

                                            />
                                            {this.state.submitted && !this.state.totalValue && <div className="mandatory">{window.strings['FARMERS']['TOTAL_VALUE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="col-md-12 pt-3 p-0">

                                            <div className="login-btn float-right">
                                                <button type="submit" className="btn btn-primary">{window.strings.SUBMIT}</button>
                                                <button className="btn btn-warning" onClick={this.pageRedirect}>{window.strings.CANCEL}</button>
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
        getCategory: state.category && state.category.Lists ? state.category.Lists : []
    };
}


export default connect(mapStateToProps, { getCategoryList, getSpecificCategory, SubmitCropDetails })(CreateCropDetails)