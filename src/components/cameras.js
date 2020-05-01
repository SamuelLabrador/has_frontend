import React, { Component } from 'react';

class Cameras extends Component{
	constructor(props){
		super(props);
		this.state = {
			error: null,
			cctvs: [],
		};
	}

	componentDidMount() {
	    var url = "/api/cctv?format=json";

	    fetch(url)
	    .then(res => res.json())
	    .then(
	    (result) => {
			var list = []
			for(var i = 0; i < result.length; i++){
				var tv = result[i];

				if(tv.image_url.includes('/d8/')){
					list.push(tv);
				}
			}


			this.setState({
				cctvs: list,
				error: false
			});
	    },
	    (error) => {
			console.log("ERROR LOADING API!");
			console.log(error);
			this.setState({
				ccvts: [],
				error: true
			});
	    });
  	}

  	renderImages(){
  		var content = [];
  		var row = [];
  		this.state.cctvs.forEach((tv, i) =>{
  			if ((i + 1) % 5 === 0){
  				content.push(
  					<div className="row" style={{'padding': '20px'}}>
  						{row}
  					</div>
  				);
  				row = []
  			}
  			else{
  				row.push(
  					<div className="col" style={{'textAlign': 'center'}}>
  						<h5 style={{color:"white"}}>{tv.route} ({tv.latitude}, {tv.longitude})</h5>
  						<img alt="cctv" src={tv.image_url} style={{width:"320px", height:"260px"}}/>
  					</div>
  				);
  			}
  		});

  		return content;
  	}

	render(){
		var images = this.renderImages();

		return (
			<div style={{backgroundColor:"#232931", "textAlign" : "center"}}>
				<h1 style={{color:"white"}}>Cameras</h1>

				<div className="container-fluid">
					{images}
				</div>
			</div>
		);
	}
}

export default Cameras;
