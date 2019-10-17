import React from 'react';
import RetailerProfile from './RetailerProfile';
import Shops from './Shops'

class RetailerDetailProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            farmerId: this.props.match.params.farmerId,
            farmerProfile: this.props.location.data && this.props.location.data.farmerData,
        }
    }
    render() {
        return (

            <div className="main-wrapper1">
                <div className="main-wrapper34">
                    <RetailerProfile profileData={this.state.farmerProfile} />
                </div>
                <div className="main-wrapper sub-wrapper">
                    <div className="tab-wrapper">
                        <Shops profileData={this.state.farmerProfile} />
                    </div>
                </div>
            </div>
        );
    }
}
export default RetailerDetailProfile;