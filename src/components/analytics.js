import React, { Component } from 'react';
import AnalyticsGraph from './AnalyticsGraph.js'

class Analytics extends Component{


	render(){
		return (
			<div style={{"background-color":"#232931","height":"100vh", "text-align": "center"}}>
				<h1 style={{"color":"white"}} >Analytics</h1>
				<AnalyticsGraph/>
			</div>
		);
	}
}

export default Analytics;
