import React from 'react';
import { Image } from 'react-bootstrap';
import {
  fetchFarmList,
  getFarmDetailData,
} from '../../actions/UserManagementAction';
import { connect } from 'react-redux';
import { imageBaseUrl } from '../../config/config';
import FarmDetails from './FarmDetails';

class FarmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmsData: [],
      farmId: '',
    };
  }

  componentDidMount() {
    let FarmerId = this.props.farmerId;
    if (FarmerId) {
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  list: state.user.farmsList,
});

export default connect(mapStateToProps)(FarmList);
