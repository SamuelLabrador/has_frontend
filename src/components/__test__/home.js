import React, { Component } from 'react';
import HomepageMap from './homepage.js'
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<h1>Home</h1>
				<div className="container-fluid">
			        <div className="row">
			          <div className="col-9">
			            <HomepageMap/>
			          </div>
			          <div className="col-3">
			            <NotificationWindow/>
			          </div>
			        </div>
			      </div>
			</div>
		);
	}
}

export default Home;