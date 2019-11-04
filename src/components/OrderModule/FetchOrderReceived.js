import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrderList } from '../../actions/orderAction'

class FetchOrderReceived extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.getOrderList();
    }
    getOrderList() {
        this.props.getOrderList()
    }
    render() {
        return (<p>FetchOrderReceived</p>)
    }
}
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps, { getOrderList })(FetchOrderReceived);
