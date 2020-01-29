import React from 'react';
import RetailerProfile from './RetailerProfile';
import Shops from './Shops'
import { connect } from 'react-redux';
import { fetchRetailers } from '../../actions/SubmitRetailerAction';
import Geocode from "react-geocode";

class RetailerDetailProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            retailerId: this.props.match && this.props.match.params && this.props.match.params.retailerId,
            farmerProfile: this.props.location.data && this.props.location.data.farmerData,
        }
    }
    componentWillReceiveProps(newProps) {
        Geocode.setApiKey("AIzaSyAHsNiCWANHwz9j7vrYA70c37dOgHQyAvU");
        Geocode.setLanguage("en");
        Geocode.setRegion("es");
        Geocode.enableDebug();

        Geocode.fromLatLng(newProps.retailerdetails.Lists.shopAddress.latitude, newProps.retailerdetails.Lists.shopAddress.longitude).then(resp => {
            if (resp && resp.results && resp.results[0] && resp.results[0].address_components) {

                let locality = resp.results[0].address_components
                let subLocalty = "";
                let district = "";
                let state = "";
                let pincode = "";

                locality.map(item => {
                    if (item.types.includes("sublocality")) {
                        subLocalty = item.long_name
                    }
                    if (item.types.includes("locality")) {
                        district = item.long_name
                    }
                    if (item.types.includes("administrative_area_level_1")) {
                        state = item.long_name
                    }
                    if (item.types.includes("postal_code")) {
                        pincode = item.long_name
                    }
                })




                // let locality = resp.results[0].address_components
                // let subLocalty = locality[1].short_name
                // let district = locality[2].short_name
                // let state = locality[3].short_name
                // let pincode = locality[5].short_name

                newProps.retailerdetails.Lists.shopLocalty = (subLocalty ? subLocalty + ', ' : '') + district + ', ' + state + ', ' + pincode
                this.setState({ profileData: newProps.retailerdetails.Lists })

            }
        });
    }

    componentDidMount() {
        this.getRetailer();
    }

    getRetailer = () => {
        if (this.state.retailerId) {
            let user = {};
            user.retailerId = this.state.retailerId;
            user.isEdit = true;
            this.props.fetchRetailers(user);
        }
    }
    redirectViewPage = () => {
        this.getRetailer();
    }
    render() {

        return (

            <div className="main-wrapper1">
                <div className="main-wrapper">
                    <RetailerProfile profileData={this.state.profileData} redirectViewPage={this.redirectViewPage} />
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


