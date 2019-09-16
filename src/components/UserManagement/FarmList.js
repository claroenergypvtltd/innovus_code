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
          <div
            key={index}
            className="card bg-white row pr-3"
            onClick={() => this.getFarmDetails(item.id)}
          >
            <Image
              src={imageBaseUrl + item.image}
              className="centext"
              roundedCircle
            />
            <div className="container">
              <button onClick={() => this.editPage(item.id)}>Edit</button>
              <div className="centext">{item.name}</div>
              <div className="centext">{item.state}</div>
              <div className="centext">
                {item.address1 + '' + item.address2}
              </div>
              <div className="centext">{item.areaSize + 'Sq.ft'}</div>
            </div>
          </div>
        );
      });
    return (
      <div className="white-bg">
        {this.state.farmId ? <FarmDetails /> : Farms}
        {!this.state.farmId && <Button onClick={this.pageRedirect}>{'Add Farm'}</Button>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.user.farmsList
});

export default connect(mapStateToProps)(FarmList);
