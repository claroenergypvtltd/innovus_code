import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TableData } from '../../shared/Table'
import { path } from '../../constants/path'

export default class FetchPool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TableHead: ["Pool ID", "Pool Name", "Total Available quantity(Unit)", "Number of Item", "Actions"],
            advanceSearch: false

        }
    }
    enableAdvanceSearch = (e) => {
        e.preventDefault();
        let enableSearch = this.state.advanceSearch ? false : true
        this.setState({ advanceSearch: enableSearch })
    }
    addPath = () => {
        this.props.history.push(path.pool.add)
    }
    handleSearch = (Data) => {

    }
    render() {
        return (
            <div className="pool">
                <div className="clearfix title-section row">
                    <div className="title-card col-md-7">
                        <h4 className="user-title">{window.strings.PRICE.POOL_LIST}</h4>
                        {/* <button className="btn btn-warning float-right" onClick={this.formPath}>{window.strings.PRICE.LIST_PRICE}</button> */}
                    </div>
                    <div className="right-title col-md-5">
                        <div className="d-flex justify-content-end">
                            <button className="common-btn float-right" onClick={this.addPath}><i className="fa fa-plus sub-plus"></i>{window.strings.PRICE.ADD_POOL}</button>
                        </div>
                    </div>
                </div>
                <div className="mb-2">
                    <div className="retailersearchdiv">
                        <button type="button" className="advance-search" onClick={this.enableAdvanceSearch} > {this.state.advanceSearch ? '- Search' : '+ Search'}
                            <span className="tooltip-text">Click to Search</span>
                        </button>
                    </div>
                    <div id="menu">
                        {this.state.advanceSearch &&
                            <div className="sub-filter ml-4">
                                <div className="row">
                                    <div className="search-tip">
                                        <form onSubmit={(e) => this.searchSubmit(e)}>
                                            <input placeholder="Key Search.."
                                                class="form-control" name="search" value={this.state.search} onChange={(e) => this.handleSearch(e)}
                                            />
                                            <button type="submit" hidden></button>
                                        </form>
                                        <span className="tooltip-text">Key Search</span>
                                    </div>
                                    <div className="ml-2">
                                        <button type="button" className="data-search">
                                            <i className="fa fa-search" aria-hidden="true"></i>Search
                                            <span className="tooltip-text">Click to Search</span>
                                        </button>
                                    </div>
                                    <div className="retail-reset">
                                        <button type="button" className="reset ml-2" onClick={this.resetSearch}>
                                            <i className="fa fa-refresh mrr5" aria-hidden="true"></i>
                                            <span className="tooltip-text">Reset</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <TableData TableHead={this.state.TableHead}
                    handleEdit={this.itemEdit} />
            </div>
        );
    }
}