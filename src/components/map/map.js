import React, { Component, useState } from 'react';
import GoogleMapReact from 'google-map-react';
//import Marker from './marker/marker';
//might need to make camera size dynamic as we zoom in and out

const CameraComponent = (props: any) => <img src={require('./camera_icon.png')} alt="**HAS CAMERA ICON HERE**" style={{height: '40px'}}/>;

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};
const GoogleMap = (props: any) => {
  //TODO: Implement user current location detection
  //default lat lng
  const [center, setCenter] = useState({lat: 33.980530, lng: -117.377020 });
  //default zoom 11
  const [zoom, setZoom] = useState(11);
  /* Change the map to be dynamic*/
  return (
    <div style={{ height: '800px', width: '800px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCZGJUFtr1-99umev6APLRq4CS_09EDNL0' }}
        defaultCenter={center}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals = {true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
    >
        {/*Markers can be specified here*/}
        <CameraComponent  
          lat={33.980530}
          lng={-117.377020}
        />
        <CameraComponent  
          lat={33.965018}
          lng={-117.377020}
        />
        <CameraComponent  
          lat={33.968214}
          lng={-117.339799}

        />        
      </GoogleMapReact>
    </div>
  );
}

GoogleMap.defaultProps={
  options:{  
    panControl: false,
    mapTypeControl: true,
    scrollwheel: true  }
}
export default GoogleMap
