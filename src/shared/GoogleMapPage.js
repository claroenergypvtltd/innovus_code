import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from 'react-google-maps';
import React from 'react';
import { compose, withProps } from 'recompose';
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");


const google = window.google = window.google ? window.google : {}

const MapWithADrawingManager = compose(
   withProps({
     googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places',
     loadingElement: <div style={{ height: `100%` }} />,
     containerElement: <div style={{ height: `400px` }} />,
     mapElement: <div style={{ height: `100%` }} />,
   }),
   withScriptjs,
   withGoogleMap
 )((props) =>
   <GoogleMap
     defaultZoom={8}
     defaultCenter={new google.maps.LatLng(-34.397, 150.644)}
   >
     <DrawingManager
       defaultDrawingMode={google.maps.drawing.OverlayType.CIRCLE}
       defaultOptions={{
         drawingControl: true,
         drawingControlOptions: {
           position: google.maps.ControlPosition.TOP_CENTER,
           drawingModes: [
             google.maps.drawing.OverlayType.CIRCLE,
             google.maps.drawing.OverlayType.POLYGON,
             google.maps.drawing.OverlayType.POLYLINE,
             google.maps.drawing.OverlayType.RECTANGLE,
           ],
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
     />
   </GoogleMap>
 );

export default class GoogleMapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
    };
    this.delayedShowMarker = this.delayedShowMarker.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker() {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  }

  handleMarkerClick() {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  }

  render() {
    return (
      <MapWithADrawingManager
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
        latitude={this.props.lat}
        longitude={this.props.lng}
      />
    );
  }
}
