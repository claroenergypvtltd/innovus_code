import React, { Component } from 'react';
import { connect } from 'react-redux';
class FetchOutofDelivery extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<p>FetchOutofDelivery</p>)
    }
}
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps, {})(FetchOutofDelivery);
