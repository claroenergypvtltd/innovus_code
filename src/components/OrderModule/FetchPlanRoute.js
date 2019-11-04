import React, { Component } from 'react';
import { connect } from 'react-redux';
class FetchPlanRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (<p>FetchPlanRoute</p>)
    }
}
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps, {})(FetchPlanRoute);
