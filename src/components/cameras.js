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
	    var url = "http://highwayanalytics.us/api/cctv?format=json";
	    
	    fetch(url)
	    .then(res => res.json())
	    .then(
	    (result) => {
			console.log('Camera loaded API');
			this.setState({
				cctvs: result,
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
  			if ((i + 1) % 5 == 0){
  				content.push(
  					<div className="row" style={{'padding': '20px'}}>
  						{row}
  					</div>
  				);
  				row = []
  			}
  			else{
  				row.push(
  					<div className="col" style={{'text-align': 'center'}}>
  						<h5>{tv.route} ({tv.latitude}, {tv.longitude})</h5>
  						<img src={tv.image_url} style={{width:"320px", height:"260px"}}/>
  					</div>
  				);
  			}
  		});

  		return content;
  	}

	render(){
		var images = this.renderImages();

		return (
			<div>
				<h1>Cameras</h1>
				
				<div className="container-fluid">
					{images}
				</div>
			</div>
		);
	}
}

export default Cameras;