import React from 'react'
import logo from './logo.svg'
import './App.css'
import MyMap from './components/MyMap'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="app-container">
        <div className="maps" id="map">
          <MyMap isMarkerShown={false}/>
        </div>
      </div>
    );
  }
}

export default App;
