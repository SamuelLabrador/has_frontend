import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Polyline } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

class AnalyticsMap extends Component{
	render(){
		return(
      <div>
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 33.622219, lng: -117.826751}}
        >
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
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
})(AnalyticsMap);
