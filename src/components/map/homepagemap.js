import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker.js';

class HomepageMap extends React.Component{
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
    var url = "http://highwayanalytics.us/api/cctv";
    // fetch(url)
    // .then(res => res.json())
    // .then(
    // (result) => {
    //   this.setState({
    //     cctvs: result,
    //     error: false
    //   })
    // },
    //   (error) => {
    //       console.log("ERROR LOADING API!");
    //       this.setState({
    //         ccvts: [],
    //         error: true
    //       })
    //     }
    // );
  }

  render(){
    //TODO: Implement user current location detection
    console.log('rendering map!');
    return(
      <div style={{ height: '800px', width: '800px'}}>
        <GoogleMapReact
          // bootstrapURLKeys={{key:process.env.REACT_APP_HAS_GOOGLE_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default HomepageMap;