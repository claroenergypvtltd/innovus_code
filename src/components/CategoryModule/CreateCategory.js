import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmitCategory, getSpecificCategory, getCategoryList } from '../../actions/categoryAction';
import classnames from 'classnames';
import { imageBaseUrl } from '../../config'
import { path } from '../../constants';
import '../../assets/css/login.scss';
import PropTypes from "prop-types";
import { CATEGORY_FETCH_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_DELETE_SUCCESS, CATEGORY_UPDATE_SUCCESS, CATEGORY_SPECIFIC_DATA_SUCCESS } from '../../constants/actionTypes';
import store from '../../store/store';
import noimg from '../../assets/noimage/Avatar_farmer.png'

class CategoryForm extends Component {
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
            farmDatas: this.props.getFarmData,
            categoryData: this.props.categoryData,
            errors: {}
        }
    }

    componentDidMount() {

        if (this.props.location && this.props.location.state && this.props.location.state.categoryId) {
            this.getSpecificCategory();
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.categoryData && nextProps.categoryData.createdStatus == "200") {
            store.dispatch({ type: CATEGORY_CREATE_SUCCESS, resp: "" })
            this.props.history.goBack();
        }
        if (nextProps.categoryData && nextProps.categoryData.updatedStatus == "200") {
            store.dispatch({ type: CATEGORY_UPDATE_SUCCESS, resp: "" })
            this.props.history.goBack();
        }

        if (nextProps.getCategory) {
            this.setState({ categoryData: nextProps.getCategory })
        }
        if (nextProps.categoryData && nextProps.categoryData.specificData && nextProps.categoryData.specificData.data && nextProps.categoryData.specificData.data.datas && nextProps.categoryData.specificData.data.datas.length > 0) {
            let Data = nextProps.categoryData.specificData.data.datas[0];
            this.setState({ description: Data.description, name: Data.name, image: Data.image });
        }

    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
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

    getSpecificCategory() {

        if (this.props.location && this.props.location.state && this.props.location.state.categoryId) {
            let cId = this.props.location.state.categoryId;
            this.setState({ categoryId: cId });

            let obj = {
                "categoryId": this.props.location.state.categoryId
            }
            this.props.getSpecificCategory(obj)
        }
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
            formData.append("categoryId", this.state.categoryId);

            this.props.SubmitCategory(formData, this.state.categoryId);
        }
    }

    listPath = () => {
        this.props.history.goBack();
    }

    render() {
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

        return (
            <div className="clearfix">
                <div className="row clearfix">
                    <div className="col-md-12">
                        <h4 className="user-title">{this.state.categoryId ? window.strings['CATEGORY']['EDITTITLE'] : window.strings['CATEGORY']['CREATETITLE']}</h4>
                        <div className="">
                            <div className=" main-wrapper">
                                <div className="col-md-6">
                                    <form onSubmit={this.handleSubmit} noValidate className="row m-0">
                                        <div className="form-group pt-3 col-md-12">

                                            <label>{window.strings.CATEGORY.NAME + ' *'}</label>

                                            <input
                                                type="text"
                                                placeholder="Category Name"
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.name
                                                })}
                                                name="name"
                                                onChange={this.handleInputChange}
                                                value={this.state.name}
                                                required

                                            />

                                            {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['CATEGORY']['CATE_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        {/* <div className="form-group pt-3 col-md-12">

                                            <label>{window.strings.CATEGORY.IMAGE}</label>

                                            <input
                                                type="file"
                                                placeholder="Image"
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.image
                                                })}
                                                name="image"
                                                onChange={this.onhandleImageChange}
                                                required

                                            />
                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['CATEGORY']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                            {imagePreview}
                                        </div> */}


                                        <div className="form-group pt-3 col-md-12">

                                            <label>{window.strings.CATEGORY.DESCRIPTION}</label>

                                            <textarea
                                                placeholder="Description"
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.description
                                                })}
                                                name="description"
                                                onChange={this.handleInputChange}
                                                value={this.state.description}
                                                required

                                            ></textarea>
                                            {this.state.submitted && !this.state.description && <div className="mandatory">{window.strings['CATEGORY']['DESCRIPTION'] + window.strings['ISREQUIRED']}</div>}
                                        </div>

                                        <div className="form-group pt-3 col-md-12">

                                            <label>{window.strings.CATEGORY.IMAGE + ' *'}</label>

                                            <input
                                                type="file"
                                                placeholder="Image"
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.image
                                                })}
                                                name="image"
                                                onChange={this.onhandleImageChange}
                                                required

                                            />
                                            {imagePreview}
                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['CATEGORY']['IMAGE'] + window.strings['ISREQUIRED']}</div>}

                                        </div>

                                        {/* <div className="col-md-12 bottom-section">
                                            <button type="button" className="btn btn-default" onClick={this.listPath}>{window.strings.CANCEL}</button>
                                            <button type="submit" className="btn btn-primary">{window.strings.SUBMIT}</button>
                                        </div> */}

                                    </form>
                                </div>
                                <div className="col-md-12 bottom-section">
                                    <button type="button" className="btn btn-default mb-2" onClick={this.listPath}>{window.strings.CANCEL}</button>
                                    <button type="submit" className="btn btn-primary mb-2" onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
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
    getCategory: state.category && state.category.Lists ? state.category.Lists : [],
    categoryData: state.category
})


export default connect(mapStateToProps, { getSpecificCategory, SubmitCategory })(CategoryForm)