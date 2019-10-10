import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { fetchFarmList, getFarmDetailData } from '../../actions/UserAction';
import { connect } from 'react-redux';
import { imageBaseUrl } from '../../config/config';
import FarmDetails from './FarmDetails';
import PropTypes from "prop-types";

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
  }

  componentWillReceiveProps(newProps) {
    if (newProps.list) {
      this.setState({ farmsData: newProps.list });
    }
  }

  getFarmDetails = farmId => {
    console.log('farmId', farmId);
    this.setState({ farmId: farmId }, () => {
      this.props.dispatch(getFarmDetailData(farmId));
    });
  };

  // /user/farm/add

  pageRedirect = () => {
    if (this.state.farmerId) {
      this.context.router.history.push({ pathname: '/farm/add', state: { farmerIdData: this.state.farmerId } });
    }

  }

  editPage = (farmId) => {
    this.context.router.history.push({ pathname: '/farm/edit/' + this.state.farmerId, state: { farmerEditId: farmId } });
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
                  <div className="farmer-address">
                    <h5 className="title">Address</h5>
                    <p className="centext user-title sub-farm">
                      {item.address1 + '' + item.address2}
                    </p>
                  </div>
                  <div className="farmer-area">
                    <h5 className="title mt-4">Total farm area</h5>
                    <p className="centext user-title sub-farm">{item.areaSize + 'Sq.ft'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });

    return (

      // <div className="white-bg row">

      <div className="farm-tab">
        <div className="white-bg">
          {this.state.farmId ? <FarmDetails /> : Farms}
          {/* {!this.state.farmId && <Button onClick={this.pageRedirect}>{'Add Farm'}</Button>} */}
        </div>
        <div className="row">
          {this.state.farmId ? <FarmDetails /> : Farms}
        </div>


        {!this.props.farmerId && <div> <div className="col-sm-4">
          <div
            className="farm-card bg-white"
          >
            <span className="farm-image">
              <Image
                src=""
                className="maincentext"
                roundedCircle
              />

            </span>
            <div className="farm-box">
              <h5 className="centext title">Shop name</h5>
              <span>
                <div className="centext color-title">
                  <i class="fa fa-map-marker map-icon" aria-hidden="true"></i>Place
    </div>
              </span>
              <div className="farmer-details pl-4">
                <div className="farmer-address">
                  <h5 className="title">Address</h5>
                  <p className="centext user-title sub-farm">
                    flat no, city, state
    </p>
                </div>

              </div>
              <div className="view-map">
                <button className="common-btn" >View on Map</button>
              </div>
            </div>
          </div>
        </div>

          <div className="col-md-12">
            <div className="row">
              <div className="col-md-4">
                <div className="farm-card main-wrapper">
                  <div className="retailer-details">
                    <img src="" className="retailer-image" />
                    <div className="retailer-proof">
                      <h5 className="retailer-title p-2 m-0">Photo Proof</h5>
                    </div>
                    <div className="pl-2">
                      <p className="user-title m-0">upload</p>
                      <p class="user-title m-0">upload</p>
                      <p class="user-title m-0">upload</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="farm-card main-wrapper">
                  <div className="retailer-details">
                    <img src="" className="retailer-image" />
                    <div className="retailer-proof">
                      <h5 className="retailer-title p-2 m-0">Photo Proof</h5>
                    </div>
                    <div className="pl-2">
                      <p className="user-title m-0">upload</p>
                      <p class="user-title m-0">upload</p>
                      <p class="user-title m-0">upload</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="farm-card main-wrapper">
                  <div className="retailer-details">
                    <img src="" className="retailer-image" />
                    <div className="retailer-proof">
                      <h5 className="retailer-title p-2 m-0">Photo Proof</h5>
                    </div>
                    <div className="pl-2">
                      <p className="user-title m-0">upload</p>
                      <p class="user-title m-0">upload</p>
                      <p class="user-title m-0">upload</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
        <div className="plus-btn">
          {!this.state.farmId && this.props.farmerId && <Button onClick={this.pageRedirect}>{'Add Farm'}</Button>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.user.farmsList
});


export default connect(mapStateToProps)(FarmList);
