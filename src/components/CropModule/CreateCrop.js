import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmitCategory, getSpecificCategory, getCategoryList } from '../../actions/categoryAction';
import classnames from 'classnames';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import store from '../../store/store';
import { CATEGORY_CREATE_SUCCESS, CATEGORY_UPDATE_SUCCESS } from '../../constants/actionTypes';
import PropTypes from "prop-types";
import noimg from '../../assets/noimage/Avatar_farmer.png'
import { imageBaseUrl } from '../../config'
import { fetchSalesAgent, getDcCodeData } from '../../actions/salesAgentAction';
import Select from 'react-select';

class CreateCrop extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            submitted: false,
            name: '',
            description: '',
            image: '',
            categoryId: '',
            parentId: '',
            file: {},
            cropId: '',
            farmDatas: this.props.getFarmData,
            errors: {}
        }
    }

    componentWillMount() {
        if (this.props && this.props.location && this.props.location.state && this.props.location.state.cropId) {
            this.setState({ cropId: this.props.location.state.cropId })
        }
    }

    componentDidMount() {
        this.getSpecificCategory();
        this.getDCData();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ categoryData: nextProps.getCategory })

        if (nextProps && nextProps.categoryData && nextProps.categoryData.specificData
            && nextProps.categoryData.specificData.data && nextProps.categoryData.specificData.data.datas
            && nextProps.categoryData.specificData.data.datas.length > 0) {
            let Data = nextProps.categoryData.specificData.data.datas[0];
            this.setState({ description: Data.description, name: Data.name, image: Data.image, parentId: Data.parentId });
        }


        if (nextProps.categoryData && nextProps.categoryData.createdStatus == "200") {
            store.dispatch({ type: CATEGORY_CREATE_SUCCESS, resp: "" })
            this.redirectPage();
        }
        if (nextProps.categoryData && nextProps.categoryData.updatedStatus == "200") {
            store.dispatch({ type: CATEGORY_UPDATE_SUCCESS, resp: "" })
            this.redirectPage();
        }
    }

    redirectPage = () => {
        this.props.history.goBack();
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    listPage = () => {
        this.context.router.history.goBack();
    }


    onhandleImageChange = (e) => {

        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                image: file.name,
                imagePreviewUrl: reader.result

            })
        }
        reader.readAsDataURL(file)


    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true
        })
        if (this.state.name && this.state.description) {
            const formData = new FormData();
            formData.append("name", this.state.name);
            formData.append("description", this.state.description);
            formData.append("image", this.state.file);
            formData.append("dcCode", this.state.dcCode);
            formData.append("categoryId", this.state.categoryId);
            if (this.state.cropId) {
                formData.append("parentId", this.state.cropId);
            } else {
                formData.append("parentId", this.state.parentId);
            }
            this.props.SubmitCategory(formData, this.state.categoryId)
        }
    }



    getSpecificCategory() {

        if (this.props.location && this.props.location.state && this.props.location.state.categoryId) {
            let cId = this.props.location.state.categoryId;
            this.setState({ categoryId: cId });

            let obj = {
                "categoryId": this.props.location.state.categoryId
            }

            this.props.getSpecificCategory(obj);
        }
    }



    listPath = () => {
        if (this.state.cropId) {
            this.props.history.push({ pathname: path.category.view + this.state.cropId, state: { categoryId: this.state.cropId } });
        } else {
            this.props.history.goBack();
        }
    }

    handleDcCodeChange = (Data) => {
        this.setState({ dcCodeObj: Data, dcCode: Data.value }, () => { this.getSalesAgentList() })
    };

    getSalesAgentList = () => {
        let obj = {
            roleId: "4",
            pages: this.state.currentPage ? this.state.currentPage : window.constant.ONE,
            row: this.state.itemPerPage,
            search: this.state.search,
            dcCode: this.state.dcCode
        }

        this.props.fetchSalesAgent(obj);
    }

    getDCData = () => {

        let obj = {
            search: ''
        }
        getDcCodeData(obj).then(resp => {
            if (resp) {

                this.setState({ dcCodeData: resp })
            }
        })
    }

    render() {
        console.log("test")
        const { errors } = this.state;
        let { imagePreviewUrl } = this.state;
        let imagePreview;

        if (imagePreviewUrl) {

            imagePreview = <img className="pre-view" src={imagePreviewUrl} />
        } else if (this.state.image) {

            imagePreview = <img className="pre-view" src={imageBaseUrl + this.state.image} />
        }
        else {
            imagePreview = <img className="pre-view" src={noimg} />
        }

        const categoryDropDown = this.state.categoryData && this.state.categoryData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        let dcData = [];
        // this.state.dcCodeData = [{ name: "0987", id: 1 }]

        this.state.dcCodeData && this.state.dcCodeData.map((item) => {

            let obj = { "label": item, "value": item };
            dcData.push(obj);
        })

        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-12">
                        <h4 className="user-title">{this.state.categoryId ? window.strings['CROP']['EDITTITLE'] : window.strings['CROP']['CREATETITLE']}</h4>
                        <div className="col-md-12 main-wrapper">
                            <div className="create-crop col-md-6">
                                <form onSubmit={this.handleSubmit} noValidate className="row m-0 pt-3">


                                    <div className="form-group col-md-12">

                                        <label>{window.strings.CROP.CROP_NAME + ' *'}</label>

                                        <input
                                            type="text"
                                            placeholder="Crop Name"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.name
                                            })}
                                            name="name"
                                            onChange={this.handleInputChange}
                                            value={this.state.name}
                                            required

                                        />

                                        {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['CROP']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-12">

                                        <label>{window.strings.SALES_AGENT.DC_CODE}</label>

                                        <Select className="state-box ml-4"
                                            value={this.state.dcCodeObj}
                                            onChange={(e) => this.handleDcCodeChange(e)}
                                            options={dcData}
                                            placeholder="--Select DC Code--"
                                        />

                                        {/* <input
                                            type="text"
                                            placeholder="DC Code"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.name
                                            })}
                                            name="dcCode"
                                            onChange={this.handleInputChange}
                                            value={this.state.dcCode}
                                            required

                                        /> */}

                                        {this.state.submitted && !this.state.dcCode && <div className="mandatory">{window.strings['SALES_AGENT']['DC_CODE'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    <div className="form-group col-md-12">

                                        <label>{window.strings.CATEGORY.DESCRIPTION}</label>

                                        <textarea
                                            placeholder="Description"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.description
                                            })}
                                            name="description"
                                            onChange={this.handleInputChange}
                                            value={this.state.description}
                                            required

                                        ></textarea>
                                        {/* {this.state.submitted && !this.state.description && <div className="mandatory">{window.strings['CATEGORY']['DESCRIPTION'] + window.strings['ISREQUIRED']}</div>} */}
                                    </div>

                                    <div className="form-group col-md-12">

                                        <label>{window.strings.CATEGORY.IMAGE + ' *'}</label>

                                        <input
                                            type="file"
                                            placeholder="Image"
                                            className={classnames('form-control', {
                                                'is-invalid': errors.image
                                            })}
                                            name="image"
                                            onChange={this.onhandleImageChange}
                                            required

                                        />
                                        {imagePreview}
                                        {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['CATEGORY']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                    </div>

                                    {/* <div className="col-md-12 pt-3 p-0">
                                            <div className="login-btn float-right">
                                                <button type="submit" className="btn btn-info" disabled={this.state.loading}>{window.strings.SUBMIT}</button>
                                                <button type="button" className="btn btn-info" onClick={this.listPath}>{window.strings.CANCEL}</button>
                                            </div>
                                        </div> */}
                                </form>
                            </div>
                            <div className="col-md-12 bottom-section">
                                <button type="button" className="btn btn-default mb-2" onClick={this.redirectPage}>{window.strings.CANCEL}</button>
                                <button type="submit" className="btn btn-primary mb-2" onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
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
    getCategory: state.category && state.category.Lists ? state.category.Lists : []
})


export default connect(mapStateToProps, { SubmitCategory, getCategoryList, getSpecificCategory, fetchSalesAgent })(CreateCrop)