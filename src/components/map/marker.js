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
			<div>
            	{/*Icon goes here*/}
        	</div>
		);
	}
}

export default Marker;