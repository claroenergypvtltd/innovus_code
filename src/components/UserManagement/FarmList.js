import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { fetchFarmList, getFarmDetailData, getKycDetails } from '../../actions/UserAction';
import { connect } from 'react-redux';
import { imageBaseUrl } from '../../config/config';
import FarmDetails from './FarmDetails';
import PropTypes from "prop-types";
import { path } from '../../constants';

class FarmList extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      farmsData: [],
      farmId: '',
      farmerId: ''
    };
  }

  componentDidMount() {

    let FarmerId = this.props.farmerId;
    if (FarmerId) {
      this.setState({ farmerId: FarmerId })
      this.props.dispatch(fetchFarmList(FarmerId));
    }
    if (this.props.userId) {
      this.getKycDetails();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.list) {
      this.setState({ farmsData: newProps.list });
    }
    if (newProps.userData && newProps.userData.kycDetails) {

      this.setState({ kycDatas: newProps.userData.kycDetails });
    }
  }

  getFarmDetails = farmId => {
    console.log('farmId', farmId);
    this.setState({ farmId: farmId }, () => {
      this.props.dispatch(getFarmDetailData(farmId));
    });
  };

  getKycDetails = () => {
    this.props.dispatch(getKycDetails(this.props.userId));
  }

  // /user/farm/add

  pageRedirect = () => {
    if (this.state.farmerId) {
      this.context.router.history.push({ pathname: path.farm.add, state: { farmerIdData: this.state.farmerId } });
    }

  }

  editPage = (farmId) => {
    this.context.router.history.push({ pathname: path.farm.edit + this.state.farmerId, state: { farmerEditId: farmId } });
  }

  render() {
    const Farms =
      this.state.farmsData &&
      this.state.farmsData.map((item, index) => {
        return (
          <div className="col-sm-4">

            <div
              key={index}
              className="farm-card bg-white"
              onClick={() => this.getFarmDetails(item.id)}
            >
              <span className="farm-image">
                <Image
                  src={imageBaseUrl + item.image}
                  className="maincentext"
                  roundedCircle
                />
                <button className="edit-icon" onClick={() => this.editPage(item.id)}><i class="fa fa-pencil"></i></button>
              </span>
              <div className="farm-box">
                <h5 className="centext title">{item.name}</h5>
                <span>
                  <div className="centext color-title">
                    <i class="fa fa-map-marker map-icon" aria-hidden="true"></i>{item.state}
                  </div>
                </span>
                <div className="farmer-details pl-4">
                  <div className="farmer-area">
                    <h5 className="title mt-4">Total farm area</h5>
                    <p className="centext user-title sub-farm">{item.areaSize + 'Sq.ft'}</p>
                  </div>
                  <div className="farmer-address">
                    <h5 className="title">Address</h5>
                    <p className="centext user-title sub-farm">
                      {item.address1 + '' + item.address2}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });

    const kycList = this.state.kycDatas && this.state.kycDatas.map((item, index) => {
      return (
        <div className="col-md-12" >
          <div className="row" >
            <div className="col-md-4">
              <div className="kyc-card main-wrapper">
                <div className="retailer-details">
                  <span className="farm-image">
                    <Image
                      src={imageBaseUrl + item.image}
                      className="maincentext"
                      roundedCircle
                    />
                    {/* <button className="edit-icon" onClick={() => this.editPage(item.id)}><i class="fa fa-pencil"></i></button> */}
                  </span>
                  <div className="retailer-proof">
                    <h5 className="retailer-title p-2 m-0">{item.proofNameId == 1 ? "Upload Identity Proof" : "Upload Photo Proof"}</h5>
                  </div>
                  {item.proofNameId == 1 && <div className="pl-2">
                    <p className="user-title m-0">{item.proofName}</p>
                    <p class="user-title m-0">{item.proofNumber}</p>
                    <p className="user-title m-0">{item.description}</p>
                  </div>}
                  {item.proofNameId == 2 && <div className="pl-2">
                    <p className="user-title m-0">{item.description}</p>
                  </div>
                  }
                </div>
              </div>
            </div>


          </div >


        </div >
      );
    })

    return (
      <div className="farm-tab" >
        <div className="white-bg">
          {this.state.farmId ? <FarmDetails /> : (this.props.userId ? kycList : Farms)}
        </div>
        <div className="plus-btn">
          {!this.state.farmId && this.props.farmerId && <Button onClick={this.pageRedirect}>{'Add Farm'}</Button>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.user.farmsList,
  userData: state.user
});


export default connect(mapStateToProps)(FarmList);
