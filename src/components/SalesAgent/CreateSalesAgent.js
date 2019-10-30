import React, { Component } from 'react';
import classnames from 'classnames';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';



export default class CreateSalesAgent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mobileNumber: '',
            errors: {}
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="row clearfix">
                <div className="col-md-12">
                    <h4 className="user-title">{this.state.categoryId ? window.strings['SALES_AGENT']['ADD_AGENT'] : window.strings['SALES_AGENT']['ADD_AGENT']}</h4>
                    <div className="col-md-12 main-wrapper">
                        <div className="create-agent col-md-6">
                            <form onSubmit={this.handleSubmit} noValidate className="row m-0 pt-3">
                                <div className="form-group col-md-12">

                                    <label>{window.strings['SALES_AGENT']['AGENT_NAME']}</label>

                                    <input
                                        type="text"
                                        placeholder="Agent Name"
                                        className={classnames('form-control', {
                                            'is-invalid': errors.name
                                        })}
                                        name="name"
                                        onChange={this.handleInputChange}
                                        value={this.state.name}
                                        required

                                    />

                                    {this.state.submitted && !this.state.name && <div className="mandatory">{window.strings['CATEGORY']['CATE_NAME'] + window.strings['ISREQUIRED']}</div>}
                                </div>
                                <div className="form-group col-md-12">

                                    <label>{window.strings['SALES_AGENT']['PHON_NO']}</label>

                                    <input
                                        type="text"
                                        placeholder={window.strings['FARMERS']['PHON_NO']}
                                        className={classnames('form-control', {
                                            'is-invalid': errors.mobileNumber
                                        })}
                                        name="mobileNumber"
                                        onChange={this.handleInputChange}
                                        value={this.state.mobileNumber}
                                        required

                                    />
                                    {this.state.submitted && !this.state.mobileNumber && <div className="mandatory">{window.strings['FARMERS']['PHON_NO'] + window.strings['ISREQUIRED']}</div>}
                                </div>

                            </form>
                        </div>
                        <div className="col-md-12 bottom-section">
                            <button type="button" className="btn btn-default mb-2" onClick={this.redirectPage}>{window.strings.CANCEL}</button>
                            <button type="submit" className="btn btn-primary mb-2" onClick={this.handleSubmit}>{window.strings.SUBMIT}</button>
                        </div>
                    </div>
                </div>


            </div>
        )
    }

}