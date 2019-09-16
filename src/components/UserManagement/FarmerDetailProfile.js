import React from 'react';
import FarmerProfile from './FarmerProfile';
import Farms from './Farms'

class FarmerDetailProfile extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         farmerId: this.props.match.params.farmerId,
         farmerProfile: this.props.location.state.farmerData,
      }
   }
   componentDidMount() {
      console.log("props", this.props);
   }
   render() {
      console.log("farmerId", this.state.farmerId);
      return (
         <div>
            <div>
               <FarmerProfile profileData={this.state.farmerProfile} />
            </div>
            <div>
               <Farms farmerId={this.props.match.params.farmerId} />
            </div>
         </div>
      );
   }
}


export default FarmerDetailProfile;