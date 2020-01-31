import React from 'react';
import { 
	withScriptjs, 
	withGoogleMap, 
	GoogleMap, 
	Marker 
} from "react-google-maps"

const MyMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{lat: 42.350668, lng: -71.077435}}
    defaultOptions={{
    	streetViewControl: false
    }}
  >
    {props.isMarkerShown && <Marker position={{lat: 42.358169, lng: -71.063666}} />}
  </GoogleMap>
));

export default MyMap;