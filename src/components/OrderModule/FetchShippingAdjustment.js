import React, { Component } from 'react';
import { connect } from 'react-redux';
class FetchShippingAdjustment extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<p>FetchShippingAdjustment</p>)
    }
}
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps, {})(FetchShippingAdjustment);
