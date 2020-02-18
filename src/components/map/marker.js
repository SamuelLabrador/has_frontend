import React, { Component } from 'react';

class Marker extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			lat: 0, 
			lng: 0
		}
	}

	componentDidMount(){

	}

	render(){
		return(
			<img 
				src={'camera_icon.png'} 
				alt="**HAS CAMERA ICON HERE**" 
				style={{height: '40px'}}
			/>
		);
	}
}

export default Marker;