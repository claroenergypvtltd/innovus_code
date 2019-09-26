import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmitCategory, getSpecificCategory, getCategoryList } from '../../actions/categoryAction';
import classnames from 'classnames';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import store from '../../store/store';
import { CATEGORY_CREATE_SUCCESS, CATEGORY_UPDATE_SUCCESS } from '../../constants/actionTypes';

class CreateCrop extends Component {
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

    redirectPage() {
        if (this.state.cropId) {
            this.props.history.push({ pathname: path.category.view + this.state.cropId, state: { categoryId: this.state.cropId } });
        } else {
            this.props.history.goBack();
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
                image: file.name

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

    render() {
        const { errors } = this.state;

        const categoryDropDown = this.state.categoryData && this.state.categoryData.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });

        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-10">
                        <h3>{this.state.categoryId ? window.strings['CROP']['EDITTITLE'] : window.strings['CROP']['CREATETITLE']}</h3>
                        <div className="col-md-6 ">
                            <div className="p-5 clearfix">
                                <div className="">
                                    <form onSubmit={this.handleSubmit} noValidate>


                                        {!this.state.cropId && <div className="form-group pt-3">

                                            <label>{window.strings['CATEGORY']['CATEGORY_NAME']}</label>

                                            <select required name="parentId" className="form-control col-xs-6 col-sm-4 " value={this.state.parentId} onChange={this.handleInputChange}>
                                                <option value="0">Select Category</option>
                                                {categoryDropDown}
                                            </select>

                                            {this.state.submitted && !this.state.parentId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>}
                                        </div>}


                                        <div className="form-group pt-3">

                                            <label>{window.strings.CATEGORY.NAME}</label>

                                            <input
                                                type="text"
                                                placeholder="Name"
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


                                        <div className="form-group pt-3">

                                            <label>{window.strings.CATEGORY.IMAGE}</label>

                                            <input
                                                type="file"
                                                placeholder="image"
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.image
                                                })}
                                                name="image"
                                                onChange={this.onhandleImageChange}
                                                required

                                            />
                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['CATEGORY']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        <div className="form-group pt-3">

                                            <label>{window.strings.CATEGORY.DESCRIPTION}</label>

                                            <textarea
                                                placeholder="description"
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


                                        <div className="col-md-12 pt-3 p-0">

                                            <div className="login-btn float-right">

                                                <button type="submit" className="btn btn-info" disabled={this.state.loading}>{window.strings.SUBMIT}</button>
                                                <button type="button" className="btn btn-info" onClick={this.listPath}>{window.strings.CANCEL}</button>
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


const mapStateToProps = (state) => ({
    categoryData: state.category,
    getCategory: state.category && state.category.Lists ? state.category.Lists : []
})


export default connect(mapStateToProps, { SubmitCategory, getCategoryList, getSpecificCategory })(CreateCrop)