import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, InfoWindow, Polyline} from 'google-maps-react';

class HomepageMap extends Component{
  static defaultProps = {
    center: {
        lat: 33.980530,
        lng: -117.377020
    },
    zoom: 11,
    style: {
      width: '100%',
      height: '100%'
    }
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
      style: {
        width: '100%',
        height: '100%'
      },
      zoom: 11,
      showingInfoWindow : false,
      selectedPlace: {},
      activeMarker: {},
      image_path : [],
    };
  }

  componentDidMount() {
    var url = "http://highwayanalytics.us/api/cctv?format=json&county=Riverside,San+Bernardino";
    fetch(url)
    .then(res => res.json())
    .then(
    (result) => {
    	//console.log(result);
    	var list = [];
    	for(var i = 0; i < result.length; i++){
      		var cctv = result[i];
      		if(cctv.image_url !== "Not Reported"){
      			list.push(cctv);
      		}
      	}
      	//console.log(list);
      	this.setState({
	        cctvs: list,
	        error: false
	    });
    },
    (error) => {
        //console.log(error);
        this.setState({
        	ccvts: [],
            error: true
        })
    });


  }

  onMarkerClick = (props, marker) => {
    var latest_image = "http://highwayanalytics.us/api/search/?search=" + props.name;
    var path = [];

    fetch(latest_image)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result.results[0].file_name)
          path.push(result.results[0].file_name)
          
          this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true,
            image_path : path,
          });
        }
      )
  };

  onMouseoverMarker= (props, marker, e) => {
    // this.setState({
    //   activeMarker: marker,
    //   selectedPlace: props,
    //   showingInfoWindow: true
    // })
    // console.log(this.state.showingInfoWindow)
  };

  onMouseoutMarker= (props, marker, e) => {
    // this.setState({
    //   activeMarker: null,
    //   showingInfoWindow: false
    // })
    // console.log(this.state.showingInfoWindow)
  };
    
  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow){
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
        image_path: null,
      })
      console.log(this.state.showingInfoWindow)
    }   
  };

  renderMap(){
    var icon_image = process.env.PUBLIC_URL + '/camera_icon2.png';

    var cctvs = this.state.cctvs.map(
      (d) =>
        <Marker
          icon={icon_image}
          name = {d.id}
          onClick = {this.onMarkerClick}
          onMouseover={this.onMouseoverMarker}
          onMouseout={this.onMouseoutMarker}
          position = { {lat: d.latitude, lng: d.longitude} }
          lat = {d.latitude}
          long = {d.longitude}
          image_url = {d.image_url}
          route = {d.route}
        />
    );
    
    return (
      <div style={{ height: '92vh', width: '100%' }}>
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          style={this.props.style}
          initialCenter={this.props.center}
          onClick={this.onMapClicked}
        >
          {cctvs}
          {/* Add the Polyline component here */}
          <Polyline
            path={[
              { lat: 33.622219, lng: -117.826751},
              { lat: 33.61224, lng: -117.817046},
              { lat: 33.603469, lng: -117.793286}
            ]}
            options={{
            strokeColor: '#ff2527',
            strokeOpacity: 0.75,
            strokeWeight: 10,
            icons: [{
              offset: '0',
              repeat: '10px'}],
            }}
          />
        </Map>
      </div>
    );
  }

  renderTable(){
    var content = []

    var path = "http://highwayanalytics.us/image/" + this.state.image_path;

    if (this.state.showingInfoWindow !== false) {
      content.push(
        <div className="row" style={{'padding': '35px'}}>
          <h2> Marker Information</h2>
          <img
              src = {this.state.selectedPlace.image_url}
              style={{
                width: '380px'
              }}
          />
          <div>
            <span> Lat : {this.state.selectedPlace.lat} Long: {this.state.selectedPlace.long}</span>
            <p> Route : {this.state.selectedPlace.route} Marker_Id : {this.state.selectedPlace.name}</p>
            <p>path : {path} </p>
          </div>
        </div>        
      );        
    }else{
      content.push(
        <div className="row" style={{'padding': '35px'}}>
          <h2> Marker Information</h2>
        </div>        
      );   
    }
    return content;
  }

  render(){
    var map = this.renderMap();
    var table = this.renderTable();

    return(
      <div className="row">
        <div className="col-9">
          {map}
        </div>
        <div className="col-3">
          {table}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
})(HomepageMap);