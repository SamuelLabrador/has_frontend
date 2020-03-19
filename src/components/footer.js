import React, {Component} from 'react';

class Footer extends Component{
	render(){
		return(
			<div>
				<footer className="page-footer font-small" style={{"paddingTop": '30px'}}>
					<div className="container-fluid text-center text-md-left">
						<div className="col-lg  text-center" style={{"color": "white"}}>
							<span></span>
						</div>
					</div>
				</footer>
			</div>
		);
	}
}

export default Footer;