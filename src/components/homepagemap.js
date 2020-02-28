import React  from 'react';
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

  render(){
    //TODO: Implement user current location detection
    var cctvs = this.state.cctvs.map(
      (d) => 
        <Marker
          lat={d.latitude}
          lng={d.longitude}
        />
    );
    console.log(process.env.REACT_APP_GOOGLE_MAP_KEY);

    return(
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAP_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {cctvs}
        </GoogleMapReact>
      </div>
    );
  }
}
  
export default HomepageMap;