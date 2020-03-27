import React, { Component } from 'react';
import { connect } from 'react-redux';
// import GoogleMap from '../../shared/GoogleMap'
import { fetchRetailers } from '../../actions/SubmitRetailerAction';
import { apiKey } from '../../config/config';
import { toastr } from '../../services/toastr.services'


import { GoogleMap, LoadScript, MarkerClusterer, Marker, Polygon } from '@react-google-maps/api'


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

    polygonClick = (e) => {
        debugger;


        const toastrConfirmOptions = {
            onOk: () => { alert("yes") },
            onCancel: () => console.log('CANCEL: clicked')
        };
        toastr.mapConfirm('', toastrConfirmOptions, "Polygon Confirmation");


    }

    markerOnClick = (e) => {
        // debugger
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
        //     { lat: -33.718234, lng: 150.363181 },
        //     { lat: -33.727111, lng: 150.371124 },
        //     { lat: -33.848588, lng: 151.209834 },
        //     { lat: -33.851702, lng: 151.216968 },
        //     { lat: -34.671264, lng: 150.863657 },
        //     { lat: -35.304724, lng: 148.662905 },
        //     { lat: -36.817685, lng: 175.699196 },
        //     { lat: -36.828611, lng: 175.790222 },
        //     { lat: -37.750000, lng: 145.116667 },
        //     { lat: -37.759859, lng: 145.128708 },
        //     { lat: -37.765015, lng: 145.133858 },
        //     { lat: -37.770104, lng: 145.143299 },
        //     { lat: -37.773700, lng: 145.145187 },
        //     { lat: -37.774785, lng: 145.137978 },
        //     { lat: -37.819616, lng: 144.968119 },
        //     { lat: -38.330766, lng: 144.695692 },
        //     { lat: -39.927193, lng: 175.053218 },
        //     { lat: -41.330162, lng: 174.865694 },
        //     { lat: -42.734358, lng: 147.439506 },
        //     { lat: -42.734358, lng: 147.501315 },
        //     { lat: -42.735258, lng: 147.438000 },
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
                            <Polygon
                                onLoad={onLoad}
                                paths={paths}
                                options={options1}
                                onClick={this.polygonClick}

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

