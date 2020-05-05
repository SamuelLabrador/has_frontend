import React, { Component } from 'react';

class Canvas extends Component{
	constructor(props){
		super(props);
		this.state = {
			url: null,
			data: null,
		}
	}

	componentDidMount(){
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext("2d");
		const img = this.refs.image;

		img.onload = () => {
			ctx.drawImage(img, 0, 0);
			var url = "http://highwayanalytics.us/api/vehicle?photo=" + this.props.photo_id; 
			fetch(url)
			.then(res => res.json())
			.then(
			(result) => {
				var width = canvas.width.toFixed(4);
				var height = canvas.height.toFixed(4);
				var boxes = result['results'];
				for(var i = 0; i < result['count']; i++){
					var entry = boxes[i];
					var x_min = entry['x_min'] * width;
					var y_min = entry['y_min'] * height;
					var x_max = entry['x_max'] * width;
					var y_max = entry['y_max'] * height;
					
					var xUpperLeft = x_min;
					var yUpperLeft = y_min; // Weird transloation of images... PIL's y_min === html's y_max
					var rect_width = x_max - x_min;
					var rect_height = y_max - y_min;

					ctx.beginPath();
					ctx.lineWidth = "2";
					ctx.strokeStyle = "red";
					ctx.rect(xUpperLeft, yUpperLeft, rect_width, rect_height);
					ctx.stroke();
				}
				this.setState({
					data:result
				});
			},
			(error) => {
				console.log("Could not fetch bounding boxes!");
				console.log(error);
			});
		}
	}


	render(){		
		var vehicles = null;
		var count = null;
		var car_count = 0;
		var truck_count = 0;

		if(this.state.data !== null){
			var data = this.state.data;
			count = data.count;
			for(var index in data.results){
				var candidate = data.results[index]
				if (candidate.label === 'Car'){
					car_count += 1;
				}
				else{
					truck_count += 1;
				}
			}
		}
		// console.log(this.props.photo_id)
		return (
			<div className="container" style={{'color':'white', 'paddingTop': '24px'}}>
				<div className="row">
					<div className="col-xs-12 col-md-6 col-lg-12">
						<canvas ref="canvas" width="320px" height="260px"/>
					</div>
					<img ref="image" alt="recent_image" src={"http://highwayanalytics.us/image/" + this.props.photo_id} style={{"display": "none"}}/>
					<div className="col-xs-12 col-md-6 col-lg-12 ">
						<table className="table" style={{"color":"white"}} >
							<tbody>
								<tr>
									<td>
										Objects of Interest 
									</td>
									<td>
										{count}
									</td>
								</tr>
								<tr>
									<td>
										Possible amount of cars
									</td>
									<td> 
										{car_count}
									</td>
								</tr>
								<tr>
									<td>
										Possible amount of trucks
									</td>
									<td>
										{truck_count}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className='row'>
						<table>
							<tbody>
								{vehicles}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

export default Canvas;