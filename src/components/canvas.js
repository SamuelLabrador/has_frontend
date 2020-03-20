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
		}
	}

	render(){
		return (
			<div className="container-fluid">
				<canvas ref="canvas" width="320px" height="260px"/>
				<img ref="image" src={this.props.url} style={{"display": "none"}}/>
			</div>
		);
	}
}

export default Canvas;