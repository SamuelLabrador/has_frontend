import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import Marker from './marker.js';

//reformat
const InfoWindow = props => (
  (props.show && props.showInfoIndex === props.id) ? (
  <div 
    style={
      {background:"white",
      border: "5px solid white", 
      borderRadius: 20,
      width: 180, 
      height: 180}
    }>
    <img 
      //change
      src = 'http://cwwp2.dot.ca.gov/data/d1/cctv/image/sr20atsr1lookingeast/sr20atsr1lookingeast.jpg'
      style={{
        width: '150px',
        height: '150px'
      }}
    />
  </div>) : null
)

const Marker = (props: any) => (
  <React.Fragment>
    <InfoWindow
      id = {props.id}
      showInfoIndex = {props.showInfoIndex}
      show={props.show}
    />
    <img 
      src='camera_icon.png' 
      alt="**HAS CAMERA ICON**"
      style={{height: '40px'}}
    />
  </React.Fragment>
)
  
  

class HomepageMap extends React.Component{
  static defaultProps = {
    center: {
        lat: 33.980530,
        lng: -117.377020
    },
    zoom: 11
  };

  constructor(props){
    super(props);
    this.state = {
      error: null,
      cctvs: [],
      center: {
        lat: 33.980530,
        lng: -117.377020
      },
      zoom: 11,
      showInfoIndex : null,
      show: false
    };
  }

  componentDidMount() {
    var url = "http://highwayanalytics.us/api/cctv?format=json";
    fetch(url)
    .then(res => res.json())
    .then(
    (result) => {
      console.log(result);
      this.setState({
        cctvs: result,
        error: false
      });
    },
      (error) => {
          console.log("ERROR LOADING API!");
          console.log(error);
          this.setState({
            ccvts: [],
            error: true
          })
        }
    );
  }

  _onChildClick = (key, childProps) => {
    console.log(childProps.id,childProps.lat,childProps.lng)
    this.setState({
      show: !this.state.show,
      showInfoIndex : childProps.id
    })
    console.log(this.state.showInfoIndex,this.state.show)
  }

  _onChildMouseEnter = (key, childProps) => {
    //make hover
  }

  _onChildMouseLeave = (key, childProps) => {
    //dont hover 
  }

  render(){
    //TODO: Implement user current location detection
    var cctvs = this.state.cctvs.map(
      (d) => 
        <Marker
          id={d.id}
          lat={d.latitude}
          lng={d.longitude}
          show={this.state.show}
          showInfoIndex={this.state.showInfoIndex}
        />
    );
    console.log(process.env.REACT_APP_GOOGLE_MAP_KEY);

    return(
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAP_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChildClick={this._onChildClick}
          // onChildMouseEnter={this._onChildMouseEnter}
          // onChildMouseLeave={this._onChildMouseLeave}
        >
          {cctvs}
        </GoogleMapReact>
      </div>
    );
  }
}
  
export default HomepageMap;