import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import { getKYClist } from '../../actions/SubmitRetailerAction';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class RetKYCList extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            KycData: []
        };
    }
    redirectPage = () => {
        this.context.router.history.goBack();
    }
    componentDidMount() {
        this.props.getKYClist(this.props.profileID);
    }
    componentWillReceiveProps(nextprops) {
        if (nextprops.Lists && nextprops.Lists.KYClist) {
            let Data = nextprops.Lists.KYClist;
            this.setState({ KycData: Data })
        }
    }
    render() {

        const kyc = this.state.KycData;

        return (
            <div className="col-md-12 p-4">
                <div className="row">

                    {this.state.KycData && this.state.KycData.map((item, index) =>
                        <div className="col-md-4">
                            <div className="farm-card main-wrapper">
                                <div className="retailer-details">
                                    <img src={imageBaseUrl + item.image} className="retailer-image" />
                                    <div className="retailer-proof">
                                        <h5 className="retailer-title p-2 m-0">{item.proofNameId == 1 ? "Upload Identity Proof" : "Upload Photo Proof"}</h5>
                                    </div>
                                    {item.proofNameId == 1 && <div className="pl-2">
                                        <p className="user-title m-0">{item.proofName}</p>
                                        <p class="user-title m-0">{item.proofNumber}</p>
                                        <p class="user-title m-0">{item.description}</p>
                                    </div>}
                                    {item.proofNameId == 2 && <div className="pl-2">
                                        <p className="user-title m-0">{item.description}</p>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    )}
                    {kyc && kyc.length == 0 && <div>{window.strings.NODATA}</div>}

                </div>
                <div className="back-btn">
                    <button className="common-btn" onClick={this.redirectPage}>Back</button>
                </div>
            </div>


        )

    }
}

const mapStateToProps = state => ({
    Lists: state.retailer
});
export default connect(mapStateToProps, { getKYClist })(RetKYCList);
