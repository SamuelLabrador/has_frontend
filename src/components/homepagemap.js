import React  from 'react';
import GoogleMapReact from 'google-map-react';
// import Marker from './marker.js';

//reformat
const InfoWindow = (props: any) => (
  (props.show && props.showInfoIndex === props.id) ? (
  <div
    style={
      {background:"white",
      border: "5px solid white",
      borderRadius: 20,
      width: 400,
      height: 250}
    }>
    <img
      //change
      src = {props.image_url}
      style={{
        width: '380px'
      }}
    />
    <div>Lat: {props.lat}  Long: {props.lng}</div>
    <div> Route: {props.route} </div>
  </div>) : null
)

const Marker = (props: any) => (
  <React.Fragment>
    <InfoWindow
      image_url = {props.image_url}
      lat = {props.lat}
      lng = {props.lng}
      id = {props.id}
      route = {props.route}
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
    var url = "http://highwayanalytics.us/api/cctv?format=json&county=Riverside,San+Bernardino";
    fetch(url)
    .then(res => res.json())
    .then(
    (result) => {
    	console.log(result);
    	var list = [];
    	for(var i = 0; i < result.length; i++){
      		var cctv = result[i];
      		if(cctv.image_url !== "Not Reported"){
      			list.push(cctv);
      		}
      	}
      	console.log(list);
      	this.setState({
	        cctvs: list,
	        error: false
	    });
    },
    (error) => {
        console.log(error);
        this.setState({
        	ccvts: [],
            error: true
        })
    });
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
          image_url ={d.image_url}
          route = {d.route}
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
