import React, { Component } from 'react';
import { connect } from 'react-redux';
// import GoogleMap from '../../shared/GoogleMap'
import { fetchRetailers } from '../../actions/SubmitRetailerAction';
import { apiKey } from '../../config/config';
import { toastr } from '../../services/toastr.services'
import { path } from '../../constants';


import { GoogleMap, LoadScript, MarkerClusterer, Marker, Polygon, DrawingManager } from '@react-google-maps/api'


// @react-google-maps/api"
// const { GoogleMap, LoadScript, MarkerClusterer, Marker } = require("../../");
// const { GoogleMap, LoadScript, MarkerClusterer, Marker } = require("../../");
// const ScriptLoaded = require("./ScriptLoaded").default;
// const DocsApiKeyInput= require("./DocsApiKeyInput").default;
// const libraries = ['drawing', 'places', 'visualization']


class ViewMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapData: [],
        }
    }

    componentDidMount() {
        this.getRetailerList();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.list && newProps.list.datas && newProps.list.datas.length > 0) {
            let selectlist = newProps.list.datas;
            this.setState({ mapData: selectlist })
        }

    }

    getRetailerList = (status) => {
        let user = {};
        user.roleId = 2;
        user.pages = window.constant.ZERO;
        this.props.fetchRetailers(user);

    };

    polygonClick = (e, Data) => {
        const toastrConfirmOptions = {
            nullPolygon: () => this.nullPolygon(Data),
            newPolygon: () => { alert("yes") },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.mapConfirm('', toastrConfirmOptions, "Polygon Confirmation");
    }

    nullPolygon = (id) => {
        alert(id);
    }

    markerOnClick = (e) => {
        // debugger
    }

    redirectPage = (e) => {
        this.props.history.push(path.user.list);
    }

    render() {

        let locations = [];

        this.state.mapData && this.state.mapData.map(item => {
            let obj = {
                lat: Number(item.shopAddres && item.shopAddres[0] && item.shopAddres[0].latitude),
                lng: Number(item.shopAddres && item.shopAddres[0] && item.shopAddres[0].longitude)
            }
            // debugger;
            locations.push(obj)
        })


        const mapContainerStyle = {
            height: '600px',
            // width: '1200px'
            width: 'auto'
        };

        const center = { lat: 28.7041, lng: 77.1025 };

        // const locations = [
        //     { lat: -31.563910, lng: 147.154312 },       
        //     { lat: -43.999792, lng: 170.463352 }
        // ];

        const options = {
            imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
        };


        const options1 = {
            // fillColor: "lightblue",
            // fillOpacity: 1,
            strokeColor: "red",
            strokeOpacity: 1,
            strokeWeight: 2,
            clickable: true,
            draggable: true,
            editable: true,
            geodesic: false,
            zIndex: 1
        }

        const paths = [
            { lat: 9.88452690, lng: 78.083235 },
            { lat: 9.8845178, lng: 78.0823286 },
            { lat: 9.8845047, lng: 78.0823384 },
            { lat: 9.8842724, lng: 78.0820141 }
        ]


        const onLoad = polygon => {
            // debugger;
            console.log("polygon: ", polygon);
        }




        return (
            <div>
                <h4 className="user-title"> GOOGLE MAP : </h4>
                <div>
                    {/* <GoogleMap latLongData={latLongData} /> */}

                    <LoadScript googleMapsApiKey={apiKey}>
                        <GoogleMap
                            id="marker-example"
                            mapContainerStyle={mapContainerStyle}
                            zoom={3}
                            center={center}
                        >
                            {/* <DrawingManager
                                // defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
                                defaultOptions={{
                                    drawingControl: true,
                                    drawingControlOptions: {
                                        // position: google.maps.ControlPosition.TOP_CENTER,
                                        // drawingModes: [
                                        //     google.maps.drawing.OverlayType.CIRCLE,
                                        //     google.maps.drawing.OverlayType.POLYGON,
                                        //     google.maps.drawing.OverlayType.POLYLINE,
                                        //     google.maps.drawing.OverlayType.RECTANGLE,
                                        // ],
                                    },
                                    circleOptions: {
                                        fillColor: `#ffff00`,
                                        fillOpacity: 1,
                                        strokeWeight: 5,
                                        clickable: false,
                                        editable: true,
                                        zIndex: 1,
                                    },
                                }}
                            /> */}
                            <Polygon
                                onLoad={onLoad}
                                paths={paths}
                                options={options1}
                                onClick={(e) => this.polygonClick(e, 1)}
                                editable={true}

                            />
                            <MarkerClusterer
                                options={options}
                            >
                                {
                                    (clusterer) => locations.map((location, i) => (
                                        <Marker
                                            key={i}
                                            position={location}
                                            clusterer={clusterer}
                                            onClick={this.markerOnClick}
                                            draggable={true}
                                        />
                                    ))
                                }
                            </MarkerClusterer>
                        </GoogleMap>
                    </LoadScript>
                </div >
                <div className="back-btn my-3">
                    <button class="common-btn" onClick={this.redirectPage}>Back</button>
                </div>

            </div >
        )
    }
}

const mapStateToProps = state => ({
    list: state.retailer.Lists ? state.retailer.Lists : [],
});
export default connect(
    mapStateToProps,
    { fetchRetailers },
)(ViewMap);

