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
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    })
    console.log(this.state.showingInfoWindow)
    //console.log(this.state.selectedPlace)
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
        showingInfoWindow2: false
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
          <InfoWindow
            marker = {this.state.activeMarker}
            onClose = {this.onInfoWindowClose}
            visible = {this.state.showingInfoWindow}
          >
            <img
              src = {this.state.selectedPlace.image_url}
              style={{
                width: '380px'
              }}
            />
            <div>
              <span> Lat : {this.state.selectedPlace.lat} Long: {this.state.selectedPlace.long}</span>
              <p> Route : {this.state.selectedPlace.route} Marker_Id : {this.state.selectedPlace.name}</p>
            </div>
          </InfoWindow>
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

    if (this.state.showingInfoWindow !== false) {
      content.push(
        <div className="row" style={{'padding': '30px'}}>
          <img
              src = {this.state.selectedPlace.image_url}
              style={{
                width: '380px'
              }}
          />
          <div>
            <span> Lat : {this.state.selectedPlace.lat} Long: {this.state.selectedPlace.long}</span>
            <p> Route : {this.state.selectedPlace.route} Marker_Id : {this.state.selectedPlace.name}</p>
          </div>
        </div>        
      );        
    }else{
      content.push(
        <div className="row" style={{'padding': '30px'}}>
          <div>
          </div>
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