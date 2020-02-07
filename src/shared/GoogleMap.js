import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export default class GoogleMap extends React.Component {
    onMarkerClick = (props, marker, e) => {
    }
    render() {
        return (
            <div style={{ width: "100%", height: "450px", position: "relative" }}>
                <Map google={window.google} zoom={14} initialCenter={{ lat: 9.877503, lng: 78.061718 }}>
                    <Marker
                        name={'Dolores park'}
                        position={{ lat: 9.88427240, lng: 78.08201410 }, { lat: 9.876208, lng: 78.068932 }} onClick={this.onMarkerClick} />
                    <Marker />
                    <Marker
                        name={'park'}
                        position={{ lat: 9.876208, lng: 78.068932 }} onClick={this.onMarkerClick} />
                    <Marker />
                </Map>
            </div>
        )
    }
}
// export default GoogleApiWrapper({ apiKey: 'AIzaSyC0OQRouIeF8m6n0brmgidHUQtT_BPguAY' })(GoogleMap)

