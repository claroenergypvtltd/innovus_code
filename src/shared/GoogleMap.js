import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { apiKey } from '../config/config';

class GoogleMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latLong: [],
            data: false
        }
    }
    onMarkerClick = (props, marker, e) => {
    }

    render() {
        let latLong = this.props.latLongData;
        // [
        // {
        //     lat: 12.120000, lng: 76.680000, name: 'Nanjangud, Mysore, Karnataka, India'
        // ]
        let initialData = '';
        if (latLong && latLong[0]) {
            initialData = latLong[0]
        } else {
            initialData = { lat: 26, lng: 80 };
        }

        return (
            <div style={{ width: "100%", height: "450px", position: "relative" }}>
                <Map google={window.google} zoom={5} center={initialData} >
                    {latLong && latLong.map((item, index) => (

                        item && item.order == 1 ? <Marker
                            // name={item.name}
                            title={item && item.title}
                            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
                            position={{ lat: item.lat, lng: item.lng }}
                            onClick={this.onMarkerClick}
                        /> :
                            <Marker
                                // name={item.name}
                                title={item && item.title}
                                position={{ lat: item.lat, lng: item.lng }}
                                onClick={this.onMarkerClick}
                            />
                    ))
                    }
                </Map>
            </div>
        )
    }
}
export default GoogleApiWrapper({ apiKey: apiKey })(GoogleMap)

