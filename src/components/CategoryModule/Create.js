import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Form, Row, Image, Transformation } from 'react-bootstrap';
import '../../assets/css/login.scss';
import { SubmitCategory } from '../../actions/categoryAction'
import { path } from '../../constants';


class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            submitted: false, categoryName: '', image: '', description: '', categoryId: '', file: '', imagePreviewUrl: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true })
        console.log("name", this.state.categoryName)

        debugger;
        if (this.state.categoryName && this.state.description) {
            debugger;
            const formData = new FormData();
            formData.append("name", this.state.categoryName);
            formData.append("image", this.state.image);
            formData.append("description", this.state.description);
            formData.append("categoryId", this.state.categoryId);

            this.props.dispatch(SubmitCategory(formData, this.state.categoryId)).then(resp => {
                if (resp) {
                    this.props.history.push(path.category.list);
                }
            });

        }


    }

    handleImageChange = (event) => {
        // this.setState({
        //     file: URL.createObjectURL(event.target.files[0])
        // })

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)

    }



    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });


        // this.setState({ name: e.target.value })

    }



    submitCancel = (e) => {
        // this.props.history.push('/category')

        this.props.history.push(path.category.list);
    }

    render() {

        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;

        $imagePreview = (<img src={imagePreviewUrl} />);



        return (
            <div >

                <div>

                    <h2>{window.strings.CATEGORY.CREATETITLE}</h2>

                    <Form className="form-elements" onSubmit={this.handleSubmit}>
                        <Form.Group >
                            <Form.Label>{window.strings.CATEGORY.NAME}</Form.Label>
                            <div className="form-adjust"><Form.Control type="text" placeholder="Name" onChange={this.handleChange} name="categoryName" /></div>
                            {(this.state.submitted && !this.state.categoryName) && <div className="mand">{window.strings.MANDATORYFIELDSTEXT}</div>}
                        </Form.Group>


                        <Form.Group >
                            <Form.Label>{window.strings.CATEGORY.IMAGE}</Form.Label>
                            <div className="form-adjust"><Form.Control type="file" name="image" onChange={this.handleImageChange} /></div>
                            {(this.state.submitted && !this.state.image) && <div className="mand">{window.strings.FIELDREQUIRED}</div>}

                            {/* <img className="uploadimage" src={this.state.file} /> */}
                            {/* <img src={this.stateimagePreviewUrl} /> */}

                            {$imagePreview}


                        </Form.Group>



                        <Form.Group >
                            <Form.Label>{window.strings.CATEGORY.DESCRIPTION}</Form.Label>
                            <div className="form-adjust"><Form.Control as="textarea" rows="2" name="description" onChange={this.handleChange} /></div>
                            {(this.state.submitted && !this.state.description) && <div className="mand">{window.strings.MANDATORYFIELDSTEXT}</div>}
                        </Form.Group><br />

                        <Button className="btn-primary " onClick={this.handleSubmit} >{window.strings.SUBMIT}</Button>
                        <Button className="btn-primary" onClick={this.submitCancel} >{window.strings.CANCEL}</Button>


                    </Form>


                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})


export default connect(mapStateToProps)(Create)