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
            harvestDate: '',
            quantity: '',
            image: '',
            categoryId: '',
            subCategoryId: '',
            farmDatas: this.props.getFarmData,
            errors: {}
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangeCategory = (e) => {
        this.setState({ categoryId: e.target.value }, () => {
            getSpecificCategory(this.state.categoryId, true).then(resp => {
                if (resp) {
                    this.setState({ subCategoryData: resp.data && resp.data.datas })
                }
            })
        })
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.setState({
            submitted: true
        }, () => {
            let obj = {
                "farmId": this.state.farmDatas && this.state.farmDatas.id,
                // "farmId": 27,
                "categoryId": this.state.categoryId,
                "cropType": this.state.type,
                "expectedHarvestDateStr": this.state.harvestDate,
                "sowDateStr": this.state.harvestDate,
                "expectedQuantity": this.state.quantity
            }

            this.props.dispatch(SubmitCropDetails(obj)).then(resp => {
                if (resp && resp.data) {
                    this.props.childData(4); //5 th tab
                }
            })

        })

    }

    componentDidMount() {
        this.props.dispatch(getCategoryList())
    }



    componentWillReceiveProps(nextProps) {
        this.setState({ categoryData: nextProps.getCategory })
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

                                            <label>{window.strings['CATEGORY']['CATEGORY_NAME']}</label>

                                            <select required name="categoryId" className="form-control col-xs-6 col-sm-4 " value={this.state.categoryId} onChange={this.onChangeCategory}>
                                                <option value="0">Select Category</option>
                                                {categoryDropDown}
                                            </select>

                                            {this.state.submitted && !this.state.categoryId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group pt-3">

                                            <label>{window.strings['CATEGORY']['SUB_CATEGORY']}</label>

                                            <select required name="subCategoryId" className="form-control col-xs-6 col-sm-4 " value={this.state.subCategoryId} onChange={this.handleInputChange}>
                                                <option value="0">Select Sub Category</option>
                                                {subCategoryDropDown}
                                            </select>

                                            {this.state.submitted && !this.state.subCategoryId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['TYPE']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['TYPE']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.type
                                                })}
                                                name="type"
                                                onChange={this.handleInputChange}
                                                value={this.state.type}
                                                required

                                            />
                                            {this.state.submitted && !this.state.type && <div className="mandatory">{window.strings['FARMERS']['TYPE'] + window.strings['ISREQUIRED']}</div>}
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


                                        <div className="form-group pt-3">

                                            <label>{window.strings['FARMERS']['DESCRIPTION']}</label>

                                            <input
                                                type="text"
                                                placeholder={window.strings['FARMERS']['DESCRIPTION']}
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.description
                                                })}
                                                name="description"
                                                onChange={this.handleInputChange}
                                                value={this.state.description}
                                                required

                                            />
                                            {this.state.submitted && !this.state.description && <div className="mandatory">{window.strings['FARMERS']['DESCRIPTION'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <h3>Image Upload</h3>


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
        getFarmData: state && state.farmer && state.farmer.farmDetails ? state.farmer.farmDetails : [],
        getCategory: state.category && state.category.Lists ? state.category.Lists : []
    };
}


export default connect(mapStateToProps)(CreateCropDetails)