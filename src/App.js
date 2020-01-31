import React from 'react';
import logo from './logo.svg';
import './App.css';
import MyMap from './components/MyMap';

let map;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="app-container">
        <div className="maps" id="map">
          <MyMap
            isMarkerShown={false}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_e5jJiT7Y1R-QuKR19E23MTCbjQixC84&v=3.exp&libraries=geometry,drawing"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `600px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
