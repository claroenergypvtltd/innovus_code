import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react';

export default class GoogleMap extends React.Component {
    render() {
        return (
            <div style={{ width: "100%", height: "300px", position: "relative" }}>
                <Map google={window.google} zoom={14} initialCenter={{ lat: 44.498955, lng: 11.327591 }}>
                </Map>
            </div>
        )
    }
}
// export default GoogleApiWrapper({ apiKey: 'AIzaSyC0OQRouIeF8m6n0brmgidHUQtT_BPguAY' })(GoogleMap)

