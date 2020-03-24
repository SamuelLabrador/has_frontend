import React, { Component } from 'react';

import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, makeWidthFlexible} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css';
import {curveCatmullRom} from 'd3-shape';
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";
import './css/graph.css';
import './css/base.css';


class VehiclesVsFreeway extends Component{
	constructor(props){
		super(props);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.state = {
			'height' : 0,
			'routes' : [
				"I-215",
				"I-10",
				"I-210",
				"I-15",
				"SR-138",
				"SR-18",
				"SR-91",
				"SR-60",
			],
			'active_route': null,
			'data' : null
		};
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	changeGraph(element, route){
		console.log(route);
		this.setState({
			'active_route': route
		});
	}

	componentDidMount(){
		var url = 'http://highwayanalytics.us/api/vehiclesPerHour';
	    fetch(url)
	    .then(response => response.json())
	    .then(
	        (result) => {
				this.setState({
					data : result,
					active_route : 'I-210'
				});
	        },
	        (error) => {
				alert("ERROR: Could Not Load Graph API.")
	    	});
	}

	toLabel(delta){
		const monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];

		var temp = new Date();
		var hours = temp.getHours();
		temp.setHours(hours - 24 + delta)

		var month = temp.getMonth();
		var date = temp.getDate();

		var timeString = hours + ':00';
		if(hours === 0){
			timeString = monthNames[month].substring(0, 3) + " " + date;
		}
		return timeString;		
	}

	render(){
		var height = window.innerHeight * (0.45);
		var buttonBar = this.state.routes.map(
			(route) =>
				<div className="col-xs-12 col">
					<button 
						className="click-me btn btn-info active" 
						style={{"width":"85px"}}
						onClick={(e) => this.changeGraph(this, route)}
					>
						{route}
					</button>
				</div>
		);

		var route_data = [];
		var data = null;
		var isLoading = false;
		var title = <h2><b><u>{this.state.active_route}</u></b> Usage vs Time</h2>

		if(this.state.data != null &&
			this.state.data.hasOwnProperty(this.state.active_route)){
			data = this.state.data[this.state.active_route];
			var size = data.length;
			for(var i = 0; i < size; i++){
				route_data.push({
					'x': i,
					'y': data[i]
				});

			}
		}

		else{
			isLoading = true;
			title = <h2>Loading</h2>
		}
		var FlexibleXYPlot = makeWidthFlexible(XYPlot);
		const override = css`
			margin: auto;
			border-color: red;
			left: 50%;
		`;

		return(
			<div className="container rounded White">
				<div className="row text-center White">
					<h2 style={{'margin':'auto'}}>
						{title}
					</h2>
				</div>
				<div className="row PaddedGraph">
					<PropagateLoader
						css={override}
						size={10}
						color={"#123abc"}
						loading={isLoading}
					/>
					<FlexibleXYPlot height={height} >
						<HorizontalGridLines style={{stroke: '#B7E9ED'}} />
						<VerticalGridLines style={{stroke: '#B7E9ED'}} />
						<XAxis
							title="Time"
							tickFormat={v => this.toLabel(v)}
							style={{
								line: {stroke: '#ADDDE1'},
								ticks: {stroke: '#ADDDE1'},
								text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
							}}
						/>
						<YAxis 
							title="Objects of Interest"
						/>
						<LineSeries
							className="series"
							data={route_data}
							curve={curveCatmullRom.alpha(0.5)}
							style={{"margin": "auto"}}
							animation={'noWobble'}
						/>
					</FlexibleXYPlot>
				</div>
				<div className="row ButtonBar">
					{buttonBar}
				</div>
			</div>
		);
	}
}

export default VehiclesVsFreeway;