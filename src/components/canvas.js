import React, { Component } from 'react';

class Canvas extends Component{
	constructor(props){
		super(props);
		this.state = {
			url: null
		}
	}

	drawBoundingBox(canvas, x_min, y_min, x_max, y_max){
	}

	componentDidMount(){
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext("2d");
		const img = this.refs.image;


		img.onload = () => {
			ctx.drawImage(img, 0, 0);
			var url = "http://highwayanalytics.us/api/vehicle?search=" + this.props.url; 
			console.log(url);
			fetch(url)
			.then(res => res.json())
			.then(
			(result) => {
				console.log(result);
				if(result['next'] === null){
					var width = canvas.width.toFixed(4);
					var height = canvas.height.toFixed(4);
					console.log(width, height);
					var boxes = result['results'];

					for(var i = 0; i < result['count']; i++){
						var entry = boxes[i];
						var shift = 10
						var x_min = entry['x_min'] * 320;
						var y_min = entry['y_min'] * 260 - shift;
						var x_max = entry['x_max'] * 320;
						var y_max = entry['y_max'] * 260 - shift;

						console.log(entry);
						console.log(x_min,y_min,x_max,y_max);
						
						var xUpperLeft = x_min;
						var yUpperLeft = y_max;
						var width = x_max - x_min;
						var height = y_max - y_min;

						ctx.beginPath();
						ctx.lineWidth = "2";
						ctx.strokeStyle = "red";
						ctx.rect(xUpperLeft, yUpperLeft, width, height);
						ctx.stroke();
					}
				}	
			});
		}
	}

	render(){
		return (
			<div className="container-fluid">
				<canvas ref="canvas" width="320px" height="260px"/>
				<img ref="image" src={"http://highwayanalytics.us/image/" + this.props.url} style={{"display": "none"}}/>
			</div>
		);
	}
}

export default Canvas;