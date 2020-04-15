import React, { Component } from 'react';
import AnalyticsGraph from './AnalyticsGraph.js'

class Analytics extends Component{


	render(){
		return (
			<div style={{"backgroundColor":"#232931","height":"100vh", "textAlign": "center"}}>
				<h1 style={{"color":"white"}} >Analytics</h1>
				<AnalyticsGraph/>
			</div>
		);
	}
}

export default Analytics;
