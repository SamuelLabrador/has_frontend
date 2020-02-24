import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import AnalyticsMap from './AnalyticsMap.js'

class Analytics extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<h1>Analytics</h1>
				<AnalyticsMap/>
			</div>
		);
	}
}

export default Analytics;
