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
        <Row className="show-grid">
          <Col sm={6} md={3} className="ticket_block">
            <Image
              src={imageBaseUrl + farmData.image}
              className="centext"
              roundedCircle
            />
            <div className="centext">{farmData.name}</div>
            <div className="centext">{'Farmer'}</div>
          </Col>
          <Col sm={6} md={3}>
            <h5>{'Farm Name'}</h5>
            <br />
            <h5>{farmData.name}</h5>
          </Col>
          <Col sm={6} md={3}>
            <h5>{'Place'}</h5>
            <br />
            <h5>{farmData.state}</h5>
          </Col>
          <Col sm={6} md={3}>
            <h5>{'Total Farm Area'}</h5>
            <br />
            <h5>{farmData.areaSize ? farmData.areaSize : '-'}</h5>
          </Col>
        </Row>

        <Row>
          {!this.state.AddCropButton && <Button onClick={this.pageRedirect}>{'Add Crop'}</Button>}
        </Row>
        <Row>
          <CropList farmDetails={this.state.farmDetails} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  farmDataDetail: state.user.farmDetails,
});

export default connect(mapStateToProps)(FarmDetails);
