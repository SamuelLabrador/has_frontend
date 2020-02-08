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
class NotificationWindow extends Component{
  constructor(props){
    super(props);
    this.state={
      //Holds list of notifications that are rendered on the screen
    }
  }
  render(){
    return(
      <div className="Notification_Window">
        Notification Window
      </div>
    )
  }
}

class MainWindow extends Component{
  constructor(props){
    super(props);
    //initial state
    // this.state={
    //   test: <Notification_Bubble/>
    // }
  }
  render(){
    return(
      <div>
        <GoogleMap/>
        <NotificationWindow/>
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
