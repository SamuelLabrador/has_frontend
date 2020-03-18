import React, { Component } from 'react';
import FlipNumbers from 'react-flip-numbers';

class VechicleCounter extends Component{
	constructor(props){
		super(props);
		this.state = {
			'count' : 0
		}
		this.getCount()
	}

	getCount(){
		var url = 'http://highwayanalytics.us/api/totalVehicle';
		fetch(url)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					'count': result['count'],
				});
			},
			(error) => {
				console.log("ERROR FETCHING COUNT API");
		});
	}

	componentDidMount(){
		setInterval(async () => {
			this.getCount()
		}, 2000);
	}

	render(){
		return(
			<div>
				<table>
					<tr>
						<td>
							<p style={{"color":"white", "font-size":"25px", "padding-top":"8px"}}>Vehicles Found: </p>
						</td>
						<td style={{"padding-bottom":"5px"}}>
							<FlipNumbers height={24} width={24} color="white" play numbers={this.state.count.toString()}/>
						</td>
					</tr>
				</table>
			</div>
		)
	}
}

export default VechicleCounter;
