import React from 'react';
import { 
	withScriptjs, 
	withGoogleMap, 
	GoogleMap, 
	Marker 
} from "react-google-maps"

const MyMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{lat: 42.358169, lng: -71.063666}}
    defaultOptions={{
    	streetViewControl: false
    }}
  >
    {props.isMarkerShown && <Marker position={{lat: 42.358169, lng: -71.063666}} />}
  </GoogleMap>
));

export default MyMap;