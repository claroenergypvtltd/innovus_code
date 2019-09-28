import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import { connect } from 'react-redux';
import CropList from './CropList';
import PropTypes from "prop-types";

class FarmDetails extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      farmData: '',
      farmDetails: {},
      AddCropButton: true,
    };
  }

  componentDidMount() {
    if (this.props.farmDataDetail && this.props.farmDataDetail.crops && this.props.farmDataDetail.crops.length >= 1) {
      this.setState({ AddCropButton: false, farmDetails: this.props.farmDataDetail });
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ farmData: newProps.farmDataDetail });
  }

  pageRedirect = () => {
    this.context.router.history.push({ pathname: '/cropDetails/add', state: { farmId: this.state.farmData.id } });
  }

  render() {
    let farmData = this.state.farmData;
    return (
      <Container>
      <div  className="farm-all">
        <Row className="show-grid">
          <Col sm={6} md={2} className="ticket_block1">
            <Image
              src={imageBaseUrl + farmData.image}
              className="maincentext"
              roundedCircle
            />
            {/*<div className="centext">{farmData.name}</div>
            <div className="centext">{'Farmer'}</div>*/}
          </Col>
          <Col sm={6} md={2} className="farm-block">
            <h5 className="farm-title">{'Farm Name'}</h5>
            <p className="user-subtitle">{farmData.name}</p>
          </Col>
          <Col sm={6} md={2} className="farm-block">
            <h5 className="farm-title">{'Place'}</h5>
            <p className="user-subtitle">{farmData.state}</p>
          </Col>
          <Col sm={6} md={3} className="farm-block">
            <h5 className="farm-title">{'Total Farm Area'}</h5>
            <p className="user-subtitle">{farmData.areaSize ? farmData.areaSize : '-'}</p>
          </Col>
          <Col sm={6} md={3} className="farm-block">
            <h5 className="farm-title">{'Total Farm Area'}</h5>
            <p className="user-subtitle">{farmData.areaSize ? farmData.areaSize : '-'}</p>
          </Col>
        </Row>
        </div>
        <div class="crop-btn">
        <h5 className="farm-title crop-title">Crop</h5>  
        {!this.state.AddCropButton && <Button onClick={this.pageRedirect}>{'Add Crop'}</Button>}

        </div>
        {/* <Row className="farm-set"> */}
        <CropList farmDetails={this.state.farmDetails} />
        {/* </Row> */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  farmDataDetail: state.user.farmDetails,
});

export default connect(mapStateToProps)(FarmDetails);
