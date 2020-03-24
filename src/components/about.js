import React, {Component} from 'react';

class ContactInfo extends Component{
	constructor(props){
		super(props);
		this.state = {
			email: "None",
			linkedin: null,
		};
	}

	render(){
		var linkedin = "none"

		if(this.props.linkedin !== null){
			linkedin = <a href={this.props.linkedin}>link</a>;
		}
		return (
			<div>

				<table className="table" style={{'color': 'white'}}>
					<tbody>
						<tr>
							<td>
								Email
							</td>
							<td>
								{this.props.email}
							</td>
						</tr>
						<tr>
							<td>
								Linkedin
							</td>
							<td>
								{linkedin}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}


class About extends Component{
	render(){
		return (
			<div className="bg-dark" style={{"background-color":"#232931","height":"100vh", "text-align": "center"}}>
				<div className="container" style={{"background-color":"#232931"}}> 
					<div className="row">
						<div className="col-md" style={{"color":"white"}}>
							<h1 style={{"color":"white"}} >About</h1>
							<p className="text-justify">
								Highway Analytics System (HAS) is a platform that collects data on 
								California highways in San Bernardino and Riverside county. Data is sourced
								from current <b>public CCTV images</b>. This is different from other platforms such 
								as Google Maps and Waze as their data comes from their user's location.
							</p>

							<p className="text-justify">
								If you would like to know more about this project feel free to contact us below.
							</p>	
						</div>
					</div>

					<div className="row" style={{"color":"white"}}> 
						<div className="col-xs-12 col-md-12 col-lg-12">
							<h1 className="text-center">The Team</h1>
						</div>
					</div>
					<div className="row" style={{"color":"white"}}>	
						<div className="col-sm-6 col-md-12 col-lg-4">			
							<h4 className="text-center">Takbir Islam</h4>
							<ContactInfo
								email={null}
								linkedin="https://www.linkedin.com/in/takbir-islam-a45b72159/"
							/>
						</div>			
						<div className="col-sm-6 col-md-12 col-lg-4">
							<h4 className="text-center">Samuel Labrador</h4>
							<ContactInfo
								email="samuel.labrador.cs@gmail[DOT]com"
								linkedin="https://www.linkedin.com/in/samuellabrador/"
							/>
						</div>
						<div className="col-sm-6 col-md-12 col-lg-4">
							<h4 className="text-center">Winson Bi</h4>
							<ContactInfo
								email="wbi002@ucr[DOT]edu"
								linkedin="https://www.linkedin.com/in/winson-bi-09917617a/"
							/>
						</div>	
					</div>
				</div>
			</div>
		);
	}
}

export default About;