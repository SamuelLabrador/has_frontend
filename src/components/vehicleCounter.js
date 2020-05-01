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
		var url = '/api/totalVehicle';
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
		}, 10000);
	}

	render(){
		return(
			<div>
				<table style={{"margin": "auto"}}>
					<tbody>
						<tr>
							<td>
								<p style={{"color":"white", "fontSize":"25px", "paddingTop":"8px"}}>Vehicles Found: </p>
							</td>
							<td style={{"paddingBottom":"5px"}}>
								<FlipNumbers height={24} width={24} color="white" play numbers={this.state.count.toString()}/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default VechicleCounter;
