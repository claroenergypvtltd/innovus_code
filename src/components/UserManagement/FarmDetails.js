import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import { connect } from 'react-redux';
import CropList from './CropList';

class FarmDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmData: '',
    };
  }

  componentDidMount() {
    console.log('this.props', this.props);
  }

  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps);
    this.setState({ farmData: newProps.farmDataDetail });
  }
  render() {
    console.log('this.state.farmData', this.state.farmData);
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
          <Button>{'Add Crop'}</Button>
        </Row>
        <Row>
          <CropList />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  farmDataDetail: state.user.farmDetails,
});

export default connect(mapStateToProps)(FarmDetails);
