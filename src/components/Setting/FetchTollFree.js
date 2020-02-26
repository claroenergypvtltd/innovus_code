import React, { Component } from 'react'
import { connect } from 'react-redux';
import { path } from '../../constants';
import { SubmitEcom, getEcom } from '../../actions/appSettingAction'
import { TableData } from '../../shared/Table'

export default class FetchTollFree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Phone Number", "Action"],
            tollFreeList: [],
            errors: {}
        }
    }

    componentDidMount() {
        getEcom('contact').then(resp => {
            if (resp) {

                this.setState({ tollFreeList: resp.data })
            }
        })
    }

    itemEdit = (id) => {
        this.props.history.push({ pathname: path.appSetting.edit + id, state: { id: id } });
    }

    tollFreeNumber = () => {
        this.props.history.push({ pathname: path.appSetting.addTollFree })

    }

    redirectPage = () => {
        this.props.history.push({ pathname: path.appSetting.list })

    }
    render() {

        let tollFreeData = this.state.tollFreeList && this.state.tollFreeList.map((item, index) => {
            return {
                "itemList": [item.description], "itemId": item.id
            }
        })

        return (
            <div>
                <div className="title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">{window.strings.APPSETTING.TOLLFREENUMBER}</h4>
                    </div>
                    <div className="right-title col-md-5">
                        <div className="d-flex justify-content-end">
                            <button className="common-btn float-right" onClick={this.tollFreeNumber}><i className="fa fa-plus sub-plus"></i>{window.strings.APPSETTING.ADD_TOLL_FREE_NUMBER}</button>
                        </div>
                    </div>
                </div>
                <div className="main-wrapper">
                    <TableData TableHead={this.state.TableHead} TableContent={tollFreeData}
                        handleEdit={this.itemEdit}
                    />
                </div>
                <div className="back-btn mt-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div>
            </div>
        )
    }

}