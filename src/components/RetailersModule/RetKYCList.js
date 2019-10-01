import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import { getKYClist } from '../../actions/SubmitRetailerAction';
import { connect } from 'react-redux';

class RetKYCList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
        };
    }
    componentDidMount() {
        this.props.getKYClist(this.props.profileID);
    }
    componentWillReceiveProps(nextprops) {
    }
    render() {
        // console.log('profileData', this.props);
        // const profile = this.props.profileData;
        // const getname = profile.name.split('_');
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-4">
                        <div className="farm-card main-wrapper">
                            <div className="retailer-details">
                                <img src="" className="retailer-image" />
                                <div className="retailer-proof">
                                    {/* <i class="fa fa-pencil retailer-edit mt-2"></i> */}
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
                                    {/* <i class="fa fa-pencil retailer-edit mt-2"></i> */}
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
                                    {/* <i class="fa fa-pencil retailer-edit mt-2"></i> */}
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
        )
    }
}

const mapStateToProps = state => ({
    Lists: state.retailer.KYClist
});
export default connect(mapStateToProps, { getKYClist })(RetKYCList);
