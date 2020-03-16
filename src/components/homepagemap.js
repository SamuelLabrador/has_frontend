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
      cctv_objects: [],
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
    this.update_congestion_lines = this.update_congestion_lines.bind(this);
    this.grabColor = this.grabColor.bind(this);
  }

  componentDidMount() {
    var url = "http://highwayanalytics.us/api/cctv?format=json&county=Riverside,San+Bernardino";
    fetch(url)
    .then(res => res.json())
    .then(
    (result) => {
    	var list = [];
    	for(var i = 0; i < result.length; i++){
      		var cctv = result[i];
      		if(cctv.image_url !== "Not Reported"){
            list.push(cctv);
      		}
      	}
      	this.setState({
	        cctvs: list,
	        error: false
	    });
    },
    (error) => {
        //console.log(error);
        this.setState({
        	cctvs: [],
            error: true
        })
    });

    url = "http://highwayanalytics.us/api/graph?format=json&county=Riverside,San+Bernardino";
    fetch(url)
    .then(res => res.json())
    .then(
    (result) => {
      var list = [];
      for(var key in result){
        if(result.hasOwnProperty(key)){
          var val = result[key];
          var i = 0;
          if(key === "SR-60" || key === "I-10" || key === "SR-91" || key === "I-210"){
            for(i=0;i < val.length;i++){
              var prev_cctv = null;
              if(i!== 0){
                prev_cctv=val[i-1];
              }
              var next_cctv = null;
              if(i !== (val.length-1)){
                next_cctv = val[i+1];
                //Calc distance
                var prev_lat_midpoint = null;
                var prev_long_midpoint = null;
                var next_lat_midpoint = null;
                var next_long_midpoint = null;
                var temp = null;
                if(prev_cctv !== null){
                  if(prev_cctv.latitude > val[i].latitude){
                      temp = Math.abs(prev_cctv.latitude-val[i].latitude)/2;
                      prev_lat_midpoint = val[i].latitude + temp;
                  }
                  else{
                      temp = Math.abs(prev_cctv.latitude-val[i].latitude)/2;
                      prev_lat_midpoint = val[i].latitude - temp;
                  }
                  if(prev_cctv.longitude > val[i].longitude){
                     temp = Math.abs(prev_cctv.longitude-val[i].longitude)/2;
                     prev_long_midpoint = val[i].longitude + temp;
                  }
                  else{
                     temp = Math.abs(prev_cctv.longitude-val[i].longitude)/2;
                     prev_long_midpoint = val[i].longitude - temp;
                  }
                }
                if(next_cctv !== null){
                  if(next_cctv.latitude > val[i].latitude){
                    temp = Math.abs(next_cctv.latitude-val[i].latitude)/2;
                    next_lat_midpoint = val[i].latitude + temp;
                  }
                  else{
                    temp = Math.abs(next_cctv.latitude-val[i].latitude)/2;
                    next_lat_midpoint = val[i].latitude - temp;
                  }
                  if(next_cctv.longitude > val[i].longitude){
                    temp = Math.abs(next_cctv.longitude-val[i].longitude)/2;
                    next_long_midpoint = val[i].longitude + temp;
                  }
                  else{
                    temp = Math.abs(next_cctv.longitude-val[i].longitude)/2;
                    next_long_midpoint = val[i].longitude - temp;
                  }
                }
                var object = {
                    "cctv": val[i],
                    "cctv_id":val[i].cctv_id,
                    "prev_cctv": prev_cctv,
                    "next_cctv": next_cctv,
                    "prev_lat_midpoint": prev_lat_midpoint,
                    "prev_long_midpoint": prev_long_midpoint,
                    "next_lat_midpoint": next_lat_midpoint,
                    "next_long_midpoint": next_long_midpoint,
                    "car_count": null
                }
                list.push(object);
              }
            }
          }
          else if( key === "I-15" || key === "I-215"){
            for(i=0;i < val.length;i++){
              var prev_cctv = null;
              if(i!== 0){
                prev_cctv=val[i-1];
              }
              var next_cctv = null;
              if(i !== (val.length-1)){
                next_cctv = val[i+1];
                //Calc distance
                var prev_lat_midpoint = null;
                var prev_long_midpoint = null;
                var next_lat_midpoint = null;
                var next_long_midpoint = null;
                var temp = null;
                if(prev_cctv !== null){
                  if(prev_cctv.latitude > val[i].latitude){
                      temp = Math.abs(prev_cctv.latitude-val[i].latitude)/2;
                      prev_lat_midpoint = val[i].latitude + temp;
                  }
                  else{
                      temp = Math.abs(prev_cctv.latitude-val[i].latitude)/2;
                      prev_lat_midpoint = val[i].latitude - temp;
                  }
                  if(prev_cctv.longitude > val[i].longitude){
                     temp = Math.abs(prev_cctv.longitude-val[i].longitude)/2;
                     prev_long_midpoint = val[i].longitude + temp;
                  }
                  else{
                     temp = Math.abs(prev_cctv.longitude-val[i].longitude)/2;
                     prev_long_midpoint = val[i].longitude - temp;
                  }
                }
                if(next_cctv !== null){
                  if(next_cctv.latitude > val[i].latitude){
                    temp = Math.abs(next_cctv.latitude-val[i].latitude)/2;
                    next_lat_midpoint = val[i].latitude + temp;
                  }
                  else{
                    temp = Math.abs(next_cctv.latitude-val[i].latitude)/2;
                    next_lat_midpoint = val[i].latitude - temp;
                  }
                  if(next_cctv.longitude > val[i].longitude){
                    temp = Math.abs(next_cctv.longitude-val[i].longitude)/2;
                    next_long_midpoint = val[i].longitude + temp;
                  }
                  else{
                    temp = Math.abs(next_cctv.longitude-val[i].longitude)/2;
                    next_long_midpoint = val[i].longitude - temp;
                  }
                }
                object = {
                    "cctv": val[i],
                    "cctv_id": val[i].cctv_id,
                    "prev_cctv": prev_cctv,
                    "next_cctv": next_cctv,
                    "prev_lat_midpoint": prev_lat_midpoint,
                    "prev_long_midpoint": prev_long_midpoint,
                    "next_lat_midpoint": next_lat_midpoint,
                    "next_long_midpoint": next_long_midpoint,
                    "car_count": null
                }
                list.push(object);
              }
            }
          }
          else{
            continue;
          }
        }
      }
        this.setState({
          cctv_objects: list,
          error: false
      });
    },
    (error) => {
        //console.log(error);
        this.setState({
          cctvs: [],
            error: true
        })
    });
  //Used for updating congestion lines, every 10 seconds
    this.intervalID = setInterval(
      ()=> this.update_congestion_lines(),
      10000
    );

  }

  componentWillUnmount(){
    clearInterval(this.intervalID);
  }
  update_congestion_lines(){
    //Update Congestions Lines
    var cctv_objects_dup = Array.from(this.state.cctv_objects);
    //Go through all cameras
    for(var i = 0; i < cctv_objects_dup.length;i++){
      var target_url = "http://highwayanalytics.us/api/vehicle/?cctv="+cctv_objects_dup[i].cctv_id+"&format=json";
      var target_photo_id = null;
      if(cctv_objects_dup[i].cctv_id !== undefined){
        fetch(target_url)
          .then(res => res.json())
          .then(
            (result) => {
              if(result !== undefined){
                if(result.results !== undefined){
                  if(result.results[0] !== undefined){
                    //Find most recent photo id on specific camera
                    target_photo_id = result.results[0].photo;
                    target_url = "http://highwayanalytics.us/api/vehicle/?photo="+target_photo_id+"&format=json";
                    fetch(target_url)
                    .then( res => res.json())
                    .then(
                      (result) => {
                        //assign that camera the result of photo count
                          for(let index = 0; index < cctv_objects_dup.length; index++){
                            if(cctv_objects_dup[index] === undefined){
                              console.log("undefined");
                              continue;
                            }
                            if(cctv_objects_dup[index].cctv_id === result.results[0].cctv){
                              cctv_objects_dup[index].car_count = result.count;
                              break;
                            }
                          }
                      },
                      (error) =>{
                        console.log("Error with using target_photo_id");
                      } 
                    ); 
                  }
                }
              }
            },
            (error) => {
              console.log("Error updating Congestion");
            }
          );
      }
    }
    //update cctv objects with new car counts
    this.setState({
      cctv_objects: cctv_objects_dup
    });
    //console.log("Lines Done Updating",this.state.cctv_objects[0].car_count);
    //console.log("here is cctv_objects",this.state.cctv_objects);
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
  
  grabColor = (car_count) =>{
    console.log("Car Count", car_count);
    if(car_count === null){
      return 'green';
    }
    else{
      return 'red';
    }
  }
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
    var prev_congestion_lines = this.state.cctv_objects.map(
      (object)=>(
        //prev_polyline
            <Polyline 
              key= {object.cctv.latitude.toString() + object.cctv.longitude.toString()}
              path={[
                { lat: object.prev_lat_midpoint, lng: object.prev_long_midpoint},
                { lat: object.cctv.latitude, lng: object.cctv.longitude},
              ]}
              options={{
              strokeColor: this.grabColor(object.car_count),
              strokeOpacity: 0.75,
              strokeWeight: 10,
              icons: [{
                offset: '0',
                repeat: '10px'}],
              }}
            />
      )
    );
    var next_congestion_lines = this.state.cctv_objects.map(
      (object)=>(
        //prev_polyline
            <Polyline
              path={[
                { lat: object.cctv.latitude, lng: object.cctv.longitude},
                { lat: object.next_lat_midpoint, lng: object.next_long_midpoint},
              ]}
              options={{
              strokeColor: this.grabColor(object.car_count),
              strokeOpacity: 0.75,
              strokeWeight: 10,
              icons: [{
                offset: '0',
                repeat: '10px'}],
              }}
            />
      )
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
          {prev_congestion_lines}
          {next_congestion_lines}
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
            src = {path}
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
