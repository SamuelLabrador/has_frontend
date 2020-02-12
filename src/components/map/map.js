import React, { Component, useState } from 'react';
import GoogleMapReact from 'google-map-react';
//import Marker from './marker/marker';
const AnyReactComponent = ({text}: any) => <div>{text}</div>;

const GoogleMap = (props: any) => {
  //TODO: Implement user current location detection
  const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
  const [zoom, setZoom] = useState(11);
  return (
      <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCZGJUFtr1-99umev6APLRq4CS_09EDNL0' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/*Markers can be specified here*/}
        <AnyReactComponent  
          lat={11.0168}
          lng={76.9558}
          text="**HAS CAMERA ICON HERE**"
        />
        <AnyReactComponent  
          lat={11.0168}
          lng={76.9558}
          text="**HAS CAMERA ICON HERE**"
        />
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMap
