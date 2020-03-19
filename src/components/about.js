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
		if(this.state.linkedin !== null){
			var linkedin = <a href={this.props.linkedin}>link</a>;
		}
		else{
			var linkedin = "none"
		}
		return (
			<div>
				<p classname="text-justify">
					Contact Information:
				</p>
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
			<div className="container" style={{"background-color":"#232931","height":"100vh", "text-align": "center"}}>
				<div className="bg-dark col-md" style={{"color":"white"}}>
					<h1 style={{"color":"white"}} >About</h1>
					<p className="text-justify">
						Highway Analytics System (HAS) is a platform that collects data on 
						California highways in San Bernardino and Riverside county. Data is sourced
						from current <b>CCTV images</b>. This is different from other platforms such 
						as Google Maps and Waze as their data comes from their user's location.
					</p>

					<p className="text-justify">
						If you would like to know more about this project feel free to contact us below.
					</p>

					<h1 className="text-center">The Team</h1>
					<div className="row">
						<div className="col-sm">
							<h4 className="text-center">Winson Bi</h4>
							<ContactInfo
								email=""
								linkedin=""
							/>
						</div>	
						<div className="col-sm">			
							<h4 className="text-center">Takbir Islam</h4>
							<ContactInfo
								email=""
								linkedin=""
							/>
						</div>			
						<div className="col-sm">
							<h4 className="text-center">Samuel Labrador</h4>
							<ContactInfo
								email="samuel.labrador.cs@gmail.com"
								linkedin="https://www.linkedin.com/in/samuellabrador/"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default About;