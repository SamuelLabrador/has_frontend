import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
// import Marker from './marker.js';

const Marker = (props: any) => 
  <img 
    src='camera_icon.png' 
    alt="**HAS CAMERA ICON**"
    style={{height: '40px'}}
  />;

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
      zoom: 11
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

  render(){
    //TODO: Implement user current location detection
    var cctvs = this.state.cctvs.map(
      (d) => 
        <Marker
          lat={d.latitude}
          lng={d.longitude}
        />
    );

    // var cctvs = <Marker lat={0} lng={0}/>

    return(
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{key:''}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {cctvs}
          <Marker  
            lat={33.980530}
            lng={-117.377020}
          />
          <Marker  
            lat={33.965018}
            lng={-117.377020}
          />
          <Marker  
            lat={33.968214}
            lng={-117.339799}
          />       

        </GoogleMapReact>
      </div>
    );
  }
}
  
export default HomepageMap;