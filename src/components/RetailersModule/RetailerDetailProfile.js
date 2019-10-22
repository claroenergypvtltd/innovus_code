import React from 'react';
import RetailerProfile from './RetailerProfile';
import Shops from './Shops'
import { connect } from 'react-redux';
import { fetchRetailers } from '../../actions/SubmitRetailerAction';

class RetailerDetailProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            retailerId: this.props.match && this.props.match.params && this.props.match.params.retailerId,
            farmerProfile: this.props.location.data && this.props.location.data.farmerData,
        }
    }
    componentWillReceiveProps(newProps) {
        let retailerData = newProps.retailerdetails.Lists;
        this.setState({ profileData: newProps.retailerdetails.Lists })

    }

    componentDidMount() {
        if (this.state.retailerId) {
            let user = {};
            user.retailerId = this.state.retailerId;
            user.isEdit = true;
            this.props.fetchRetailers(user);
        }
    }


    render() {
        return (

            <div className="main-wrapper1">
                <div className="main-wrapper34">
                    <RetailerProfile profileData={this.state.profileData} />
                </div>
                <div className="main-wrapper sub-wrapper">
                    <div className="tab-wrapper">
                        <Shops profileData={this.state.profileData} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    retailerdetails: state.retailer,
});

export default connect(
    mapStateToProps,
    { fetchRetailers },
)(RetailerDetailProfile);


