import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import AnalyticsMap from './AnalyticsMap.js'
import AnalyticsGraph from './AnalyticsGraph.js'

class Analytics extends Component{
	

	render(){
		return (
			<div>
				<h1>Analytics</h1>
				{/* <AnalyticsMap/> */}
				<AnalyticsGraph/>
			</div>
		);
	}
}

export default Analytics;
