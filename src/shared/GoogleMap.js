import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export default class GoogleMap extends React.Component {
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
        // },
        // {
        //     lat: 23.905445, lng: 87.524620, name: 'Suri, West Bengal, India'
        // },
        // {
        //     lat: 30.525005, lng: 75.890121, name: 'Malerkotla, Punjab, India'
        // },
        // {
        //     lat: 26.88446400, lng: 80.99589040, name: 'Vizianagaram, Andhra Pradesh, India'
        // },
        // {
        //     lat: 28.42840330, lng: 77.07267900, name: 'Vizianagaram, Andhra Pradesh, India'
        // },
        // {
        //     lat: 26.88409520, lng: 80.99661670, name: 'Vizianagaram, Andhra Pradesh, India'
        // },
        // {
        //     lat: 28.42427390, lng: 77.06849550, name: 'Vizianagaram, Andhra Pradesh, India'
        // },
        // ]
        return (
            <div style={{ width: "100%", height: "450px", position: "relative" }}>
                <Map google={window.google} zoom={5} initialCenter={{ lat: 26, lng: 80 }}>
                    {this.state.latLong && this.state.latLong.map((item, index) => (
                        <Marker
                            // name={item.name}
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
// export default GoogleApiWrapper({apiKey: 'AIzaSyC0OQRouIeF8m6n0brmgidHUQtT_BPguAY' })(GoogleMap)

