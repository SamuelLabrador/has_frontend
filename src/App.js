import React, {Component, createRef} from 'react';
import './App.css';
import Map from './map'

//Map functionality
class GoogleMap extends Component{
  render(){
    return(
      <Map
        id="myMap"
        options={{
          center: { lat: 41.0082, lng: 28.9784 },
          zoom: 8
        }}
        onMapLoad={map => {
          var marker = new window.google.maps.Marker({
            position: { lat: 41.0082, lng: 28.9784 },
            map: map,
            title: 'Hello Istanbul!'
          });
        }}
      />
    );
  }
}
//Map

const Header = () => {
  return(
    <div>
      <h1>Highway Analytics System</h1>
      <button type="button">Analytics</button>
      <button type="button">View Cameras</button>
      <button type="button">Login</button>
    </div>
  );
};
class MainWindow extends Component{
  constructor(props){
    super(props);
    //initial state
    this.state={

    }
  }
  render(){
    return(
      <div>
        <GoogleMap/>
      </div>
    );
  }
};
function App() {
  return (
    <div className="App">
    <Header/>
    <MainWindow/>
    </div>
  );
}

export default App;
