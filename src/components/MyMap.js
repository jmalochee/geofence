import React from 'react';
import { 
	withScriptjs, 
	withGoogleMap, 
	GoogleMap, 
	Marker 
} from 'react-google-maps'
import { compose, withProps } from 'recompose'
// recompose used to follow design choices made by react-google-maps docs

let url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD_e5jJiT7Y1R-QuKR19E23MTCbjQixC84&v=3.exp&libraries=geometry,drawing";
// assigned here because my editor's syntax highlighting is thrown off by "...//..." – it's the little things!

const MyMap = compose(
  withProps({
    googleMapURL: url,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) => 
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{lat: 42.350668, lng: -71.077435}}
    defaultOptions={{
    	streetViewControl: false
    }}
  >
    {props.isMarkerShown && <Marker position={{lat: 42.358169, lng: -71.063666}} />}
  </GoogleMap>
);

export default MyMap;