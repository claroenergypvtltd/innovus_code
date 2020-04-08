import React, { Component } from 'react';
import { connect } from 'react-redux';
class FetchDelivered extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<p>FetchDelivered</p>)
    }
}
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps, {})(FetchDelivered);
