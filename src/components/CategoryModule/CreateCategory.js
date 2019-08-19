import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { loginUser } from '../../actions/authentication';
import { SubmitCategory, getSpecificCategory, getCategoryList } from '../../actions/categoryAction';
// AddCategory
import logo from '../../assets/images/logo.png';
import classnames from 'classnames';
import { path } from '../../constants';
import '../../assets/css/login.scss';
import { Link } from 'react-router-dom'

class CategoryForm extends Component {

    constructor(props) {

        super(props);
        this.state = {
            submitted: false,
            name: '',
            description: '',
            // image: '',
            categoryId: '',
            farmDatas: this.props.getFarmData,
            errors: {}
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.setState({
            submitted: true
        })
        console.log(this.state);
        if (this.state.name && this.state.description) {

            const formData = new FormData();

            formData.append("name", this.state.name);
            formData.append("description", this.state.description);
            // formData.append("image", this.state.image);
            formData.append("categoryId", this.state.categoryId);

            SubmitCategory(formData, this.state.categoryId).then(resp => {
                if (resp) {
                    this.props.history.push(path.category.list);
                }
            });

        }
    }

    componentDidMount() {
        this.getSpecificCategory();
        this.props.dispatch(getCategoryList())
    }

    getSpecificCategory() {

        if (this.props.location && this.props.location.state && this.props.location.state.categoryId) {
            let cId = this.props.location.state.categoryId;
            this.setState({ categoryId: cId });
            getSpecificCategory(this.props.location.state.categoryId).then(resp => {

                let Data = resp.data.datas[0];
                this.setState({ description: Data.description, name: Data.name });
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ categoryData: nextProps.getCategory })
    }

    listPath = () => {
        this.props.history.push(path.category.list);
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
                        <h3>{window.strings['CATEGORY']['CREATETITLE']}</h3>
                        <div className="col-md-6 ">
                            <div className="p-5 clearfix">
                                <div className="">
                                    <form onSubmit={this.handleSubmit} noValidate>
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

                                            <label>{window.strings['CATEGORY']['CATEGORY_NAME']}</label>

                                            <select required name="categoryId" className="form-control col-xs-6 col-sm-4 " value={this.state.categoryId} onChange={this.onChangeCategory}>
                                                <option value="0">Select Category</option>
                                                {categoryDropDown}
                                            </select>

                                            {/* {this.state.submitted && !this.state.categoryId && <div className="mandatory">{window.strings['FARMERS']['CROP_NAME'] + window.strings['ISREQUIRED']}</div>} */}
                                        </div>



                                        <div className="form-group pt-3">

                                            <label>{window.strings.CATEGORY.DESCRIPTION}</label>

                                            <input
                                                type="text"
                                                placeholder="description"
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.description
                                                })}
                                                name="description"
                                                onChange={this.handleInputChange}
                                                value={this.state.description}
                                                required

                                            />
                                            {this.state.submitted && !this.state.description && <div className="mandatory">{window.strings['CATEGORY']['DESCRIPTION'] + window.strings['ISREQUIRED']}</div>}
                                        </div>


                                        {/* <div className="form-group pt-3">

                                            <label>{window.strings.CATEGORY.IMAGE}</label>

                                            <input
                                                type="file"
                                                placeholder="image"
                                                className={classnames('form-control form-control-lg', {
                                                    'is-invalid': errors.image
                                                })}
                                                name="image"
                                                onChange={this.handleInputChange}
                                                value={this.state.image}
                                                required

                                            />
                                            {this.state.submitted && !this.state.image && <div className="mandatory">{window.strings['CATEGORY']['IMAGE'] + window.strings['ISREQUIRED']}</div>}
                                        </div> */}


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
    getCategory: state.category && state.category.Lists ? state.category.Lists : []
})


export default connect(mapStateToProps)(CategoryForm)