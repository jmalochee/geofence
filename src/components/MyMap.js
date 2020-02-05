import React from 'react'
import { 
	withScriptjs, 
	withGoogleMap, 
	GoogleMap, 
	Marker 
} from 'react-google-maps'
import _ from 'lodash'
import { compose, withProps, lifecycle } from 'recompose'
// recompose and lodash used to follow design choices made by react-google-maps docs
import SearchBox from 'react-google-maps/lib/components/places/SearchBox'
/* global google */

let url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD_e5jJiT7Y1R-QuKR19E23MTCbjQixC84&v=3.exp&libraries=geometry,drawing,places";
// assigned here because my editor's syntax highlighting is thrown off by "...//..." – it's the little things!


// lifecycle prop from react-google-maps docs. given the time, i would refactor using my own design choices, but i am not familiar enough with recompose to untangle everything on deadline.
// SearchBox and input also from docs because i'm bound to this implementation and there's not a lot of room for variation. and the style looks familiar.
const MyMap = compose(
  withProps({
    googleMapURL: url,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {lat: 42.350668, lng: -71.077435},
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => 
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={13}
    defaultCenter={{lat: 42.350668, lng: -71.077435}}
    onBoundsChanged={props.onBoundsChanged}
    defaultOptions={{
    	streetViewControl: false,
      mapTypeControl: true,
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT
      }
    }}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search..."
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          margin: `15px`,
          padding: `0 10px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
    {props.isMarkerShown && <Marker position={{lat: 42.358169, lng: -71.063666}} />}
  </GoogleMap>
);

export default MyMap;