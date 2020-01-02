import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Select from 'react-select';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

export default class CreatePool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {}
        }
    }
    render() {
        const { errors } = this.state;
        let dropDownData = [];

        this.state.userData && this.state.userData.map((item) => {

            let obj = { "label": item.name, "value": item.id };
            dropDownData.push(obj);
        })
        const weightDropDown = this.state.weightDatas && this.state.weightDatas.map((item, index) => {
            return <option key={index}
                value={item.id}> {item.name}</option>
        });
        return (
            <div className="clearfix ">
                <div className="row clearfix">
                    <div className="col-md-12">
                        <h4 className="user-title">{this.state.priceId ? window.strings['PRICE']['POOLTITLE'] : window.strings['PRICE']['POOLTITLE']}</h4>
                        <div className="main-wrapper pt-3">
                            <div className="col-md-10">
                                <form onSubmit={this.handleSubmit} noValidate className="row m-0">
                                    <div className="form-group col-md-6">
                                        <label>{window.strings.FARMERS.NAME}</label>
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            className={classnames('form-control')}
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>{window.strings.PRICE.SELECT_ITEM}</label>
                                        <Select className="state-box"
                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }
                                                })
                                            }}
                                            // value={this.state.dcCodeObj}
                                            // onChange={(e) => this.handleDcCodeChange(e)}
                                            // options={dcData}
                                            placeholder="--Select Item--"
                                        />
                                    </div>
                                    {/* <div className="form-group col-md-6 pt-2">
                                        <label>{window.strings.PRICE.SELECT_ITEM}</label>
                                        <ReactMultiSelectCheckboxes className="select-box"
                                            styles={{
                                                control: base => ({
                                                    ...base,
                                                    borderColor: 'hsl(0,0%,80%)',
                                                    boxShadow: '#FE988D',
                                                    '&:hover': {
                                                        borderColor: '#FE988D'
                                                    }
                                                })
                                            }}
                                            options={dropDownData}
                                            onChange={this.checkbox} />
                                    </div> */}
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
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label>{window.strings.PRICE.TYPE}</label>
                                        <select required name="weightId" className="form-control" value={this.state.weightId} onChange={this.handleInputChange} Z>
                                            <option value="0">Select</option>
                                            {weightDropDown}
                                        </select>
                                        {this.state.submitted && this.state.weightId == 0 && <div className="mandatory">{window.strings['CROP']['WEIGHT'] + ' ' + window.strings['PRICE']['TYPE'] + window.strings['ISREQUIRED']}</div>}
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
        );
    }
}