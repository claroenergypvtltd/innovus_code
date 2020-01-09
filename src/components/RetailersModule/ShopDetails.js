import React from 'react';
import { Row, Col, Image, Button, Grid, Container } from 'react-bootstrap';
import { imageBaseUrl } from '../../config/config';
import PropTypes from "prop-types";
import noimg from '../../assets/noimage/Avatar_farmer.png'
import { updateStatusRetailer, SubmitRetailer } from '../../actions/SubmitRetailerAction';
import { toastr } from '../../services/toastr.services'
import { path } from '../../constants';
import ImageZoom from 'react-medium-image-zoom'
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import { TableData } from '../../shared/Table'
import store from '../../store/store';
import { RETAILER_CREATE_SUCCESS } from '../../constants/actionTypes';

class ShopDetails extends React.Component {
    static contextTypes = {
        router: PropTypes.object
    }
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0,
            showStatusBtn: true,
            activeButton: false,
            rejectKey: false,
            rotation: 0,
            profile: [],
            canvasImage: '',
            TableHead: ['Shop Image', 'Shop Status', 'Shop Name', 'Distance', 'Shop Address', 'Agent Name', "Action"]
        };
    }
    componentDidMount() {
        if (this.props.profileData && this.props.profileData.isActive == "0") {
            this.setState({ activeButton: false });
        } else {
            this.setState({ activeButton: true });
        }
        const Shopprofile = this.props.profileData ? this.props.profileData : [];
        this.setState({ profile: Shopprofile });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.status == 200) {
            store.dispatch({ type: RETAILER_CREATE_SUCCESS, status: '' })
            toastr.success(newProps.message);
            this.redirectPage();
        }
        if (newProps.profileData && newProps.profileData.isActive == "0") {
            this.setState({ activeButton: false });
        } else {
            this.setState({ activeButton: true });
        }
        const Shopprofile = this.props.profileData ? this.props.profileData : [];
        this.setState({ profile: Shopprofile });
    }

    redirectPage = () => {
        this.context.router.history.push({ pathname: path.user.list, state: { retlrbckTrack: "backTrue" } })
    }
    updateStatus(RetId, status, isActive) {
        let message = window.strings.UPDATEMESSAGE;
        const toastrConfirmOptions = {
            onOk: () => {
                const formData = new FormData();
                formData.append("userId", RetId);
                formData.append("roleId", 2);
                if (isActive == "isActive") {
                    formData.append("isActive", status);
                } else {
                    formData.append("status", status);
                }
                updateStatusRetailer(formData).then(resp => {
                    if (resp && resp.status == 200) {
                        this.context.router.history.push({ pathname: path.user.list, state: { retlrbckTrack: "backTrue" } })
                        let activeKey;
                        if (this.state.activeButton) {
                            activeKey = false
                        } else {
                            activeKey = true
                        }
                        if (isActive) {
                            this.setState({
                                activeButton: activeKey
                            })
                        } else {
                            this.setState({ showStatusBtn: false });
                        }
                        if (resp.data && resp.data.status == "2") {
                            this.setState({ rejectKey: true });
                        }
                    }
                })
            },
            onCancel: () => { }
        };
        toastr.customConfirm(message, toastrConfirmOptions, window.strings.UPDATERETSTATUS);
    }

    rotateleft = () => {
        let newRotation = this.state.rotation - 90;
        if (newRotation >= 360) {
            newRotation = - 360;
        }
        this.setState({
            rotation: newRotation,
        })
    }
    uploadImage = (shopImg) => {
        let upload = true;
        const formData = new FormData();
        formData.append("shopImage", this.state.shopImg);
        formData.append("userId", this.props.profileData && this.props.profileData.id);
        this.props.SubmitRetailer(formData, upload)
    }
    imageCapture(shopImg) {
        let self = this;
        html2canvas(document.getElementById('capture'), { letterRendering: 1, allowTaint: true, background: '#FFFFF', useCORS: true, async: false }).then(canvas => {
            let data = canvas.toDataURL("image/png", 0.7);
            let trimdata = data.replace(/^data:image\/(png|jpeg|jpg|'');base64,/, '');
            const imageBlob = self.dataURItoBlob(trimdata);
            var blobfile = new File([imageBlob], 'rotated.png', { type: 'image/png', lastModified: Date.now() });
            self.setState({ file: blobfile, shopImg: data }, () => {
                console.log('----shopImg-----', this.state.file);
                console.log('----canvasImage-----', this.state.shopImg);
                // this.uploadImage();
            });
        });
    }

    dataURItoBlob(dataURI) {
        const byteString = window.atob(dataURI);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/jpeg' });
        return blob;
    }
    editShopDetails = () => {
        this.context.router.history.push({ pathname: path.retailer.add, state: this.props.profileData })
    }

    transferSecondary = (userId, mobileNumbers) => {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("mobileNumbers", mobileNumbers);
        formData.append("isActive", 1);
        this.props.SubmitRetailer(formData, true);
    }
    handleTransferChange = (Id, mobileNumbers) => {
        let message = "Are you sure you want to Transfer ?";
        const toastrConfirmOptions = {
            onOk: () => { this.transferSecondary(Id, mobileNumbers) },
            onCancel: () => {
            }
        };
        toastr.confirm(message, toastrConfirmOptions, "Transfer")
    }

    render() {
        const profile = this.props.profileData ? this.props.profileData : [];
        let shopAddressLat = profile.shopAddress && profile.shopAddress.latitude ? profile.shopAddress.latitude : '';
        let shopAddressLng = profile.shopAddress && profile.shopAddress.longitude ? profile.shopAddress.longitude : '';
        let shopImg = noimg;
        if (profile.shopAddress && profile.shopAddress.image) {
            shopImg = imageBaseUrl + profile.shopAddress.image
        }
        let mapPinString = "http://www.google.com/maps/place/" + shopAddressLat + ',' + shopAddressLng;
        let mobileNumbers = profile && profile.mobileNumber ? profile.mobileNumber : '';
        const { rotation } = this.state;
        let pendingShops = this.props.profileData && this.props.profileData.shopLocation && this.props.profileData.shopLocation.map(item => {
            let imgName = noimg
            if (item.image) {
                imgName = imageBaseUrl + item.image
            }
            let imageZoom = <div >
                <ImageZoom
                    image={{
                        src: imgName,
                        className: "zoom-img",
                        id: "capture",
                        style: { transform: `rotate(${rotation}deg)` }
                    }}
                    zoomImage={{
                        src: { imgName }
                    }}
                />
            </div>
            let transfer = <button onClick={() => this.handleTransferChange(item.userId, mobileNumbers)} className="trans-btn">Transfer</button>
            let distance = item.distance ? item.distance.toFixed(2) : '-';
            let status = item.isActive == 0 ? <p> Pending </p> : item.isActive == 1 ? <p>Accepted</p> : <p>Rejected</p>

            return { "itemList": [imageZoom, status, item.name, distance, item.address1 + item.address2, item.agentName, transfer], "itemId": item.id }
        })

        return (
            <div className="farm-tab p-1 active-box" >
                {

                    (profile.status == 0 || profile.status == 1) && !this.state.rejectKey &&
                    <div className="assign-box">
                        {!this.state.activeButton && <button className="active-btn" onClick={(e) => this.updateStatus(profile.id, 1, 'isActive')}>Active</button>}
                        {this.state.activeButton && <button className="active-btn" onClick={(e) => this.updateStatus(profile.id, 0, 'isActive')}>InActive</button>}
                        {((this.props.profileData && this.props.profileData.status == 0) || (this.props.profileData.status == 1)) && <div>
                            <button className="shop-edit" onClick={this.editShopDetails}><i class="fa fa-pencil"></i>Edit</button>
                        </div>}
                    </div>
                }
                <div className="row">
                    <div className="col-sm-4">
                        <div className="farm-card bg-white">
                            <div className="farm-image">
                                <div >
                                    <ImageZoom
                                        image={{
                                            src: shopImg,
                                            // className: "maincentext",
                                            className: "shop-centext",
                                            id: "capture",
                                            style: { transform: `rotate(${rotation}deg)` }
                                        }}
                                        zoomImage={{
                                            src: { shopImg }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="farm-box">
                            <h4 className="user-title m-0">Shop Name</h4>
                            <p className="title">{profile.shopAddress && profile.shopAddress.name}</p>
                            <div className="farmer-details row mt-3">
                                <div className="farmer-address col-md-6 mb-2">
                                    <h4 className="user-title m-0">Shop Address</h4>
                                    <p className="centext title sub-farm">
                                        {profile.shopAddress && profile.shopAddress.address1}
                                    </p>
                                </div>
                                <div className="farmer-address col-md-6 mb-2">
                                    <h4 className="user-title m-0">Shop Type</h4>
                                    <p className="centext title sub-farm">
                                        {profile.shopType && profile.shopType.type}
                                    </p>
                                </div>
                                <div className="farmer-address col-md-6 mb-2">
                                    <h4 className="user-title m-0">Shop Locality</h4>
                                    <p className="centext title sub-farm">
                                        {profile.shopAddress && profile.shopAddress.address2}
                                    </p>
                                </div>
                                <div className="farmer-address col-md-6 mb-2">
                                    <h4 className="user-title m-0">Shop Time</h4>
                                    <p className="centext title sub-farm">
                                        {profile.shopAddress && profile.shopAddress.shopOpeningTime}
                                    </p>
                                </div>
                                <span>
                                    <button className="common-btn mt-2 ml-2">
                                        <a target="_blank" href={mapPinString} className="shop-map" ><i class="fa fa-map-marker map-icon pl-0" aria-hidden="true"></i>View on Map</a>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {profile && profile.status == 0 && <div className="farm-tab p-1 active-box">
                    <TableData TableHead={this.state.TableHead} TableContent={pendingShops} />
                </div>}
                <div className="row back-btn">
                    <div className="col-md-6">
                        <button className="common-btn" onClick={this.redirectPage}>Back</button>
                    </div>
                    {this.state.showStatusBtn && profile.status == 0 && <div className="col-md-6 d-flex justify-content-end">
                        <button className="reject-btn" onClick={(e) => this.updateStatus(profile.id, 2)}>Reject</button>
                        <button className="accept-btn" onClick={(e) => this.updateStatus(profile.id, 1)}>Accept</button>
                    </div>}
                </div>
            </div >
        )
    }
}
const mapStatetoProps = (state) => ({
    status: state.retailer.status,
    message: state.retailer.message
})
export default connect(mapStatetoProps, { SubmitRetailer })(ShopDetails)
