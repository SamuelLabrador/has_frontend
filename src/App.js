import React, {Component, createRef} from 'react';
import './App.css';
import HomepageMap from './components/map/homepagemap.js'

import 'bootstrap/dist/css/bootstrap.min.css';


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
  }
  render(){
    return(
      <div className="Main_Window">
        <HomepageMap/>
      </div>
    );
  }
};

function App() {
  return (
    <div className="App">
      <Header/>

      <div className="container-fluid">
        <div className="row">
          <div className="col-9">
            <HomepageMap/>
          </div>
          <div className="col-3">
            <NotificationWindow/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
