import React, { Component } from 'react';

class Canvas extends Component{
	constructor(props){
		super(props);
		this.state = {
			url: null
		}
	}

	componentDidMount(){
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext("2d");
		const img = this.refs.image;

		img.onload = () => {
			ctx.drawImage(img, 0, 0);
			var url = "http://highwayanalytics.us/api/vehicle?search=" + this.props.url; 
			fetch(url)
			.then(res => res.json())
			.then(
			(result) => {
				var width = canvas.width.toFixed(4);
				var height = canvas.height.toFixed(4);
				var boxes = result['results'];

				for(var i = 0; i < result['count']; i++){
					var entry = boxes[i];
					var shift = 10
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
			},
			(error) => {
				console.log("Could not fetch bounding boxes!");
				console.log(error);
			});
		}
	}

	render(){		

		return (
			<div className="container-fluid">
				<canvas ref="canvas" width="320px" height="260px"/>
				<img ref="image" alt="recent_image" src={"http://highwayanalytics.us/image/" + this.props.url} style={{"display": "none"}}/>
			</div>
		);
	}
}

export default Canvas;