import {Route, Switch, Link} from "react-router-dom";
import React, {Component} from 'react';
// import Login from './login.js';
import Analytics from './analytics.js';
import Cameras from './cameras.js';
import Home from './home.js';
import VehicleCounter from './vehicleCounter.js';
import About from './about.js'
import './css/header.css';
// import NotificationSignUp from './notificationsignup.js';

class Header extends Component{

	render(){
		var icon_image = process.env.PUBLIC_URL + '/highway.png';
		return (
			<div>
				<ul className="nav justify-content-begin nav-tabs bg-dark">
					<li className="nav-item">
						<img className="nav-icon" src={icon_image} alt= "Highway Icon"/>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/">Highway Analytics System</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/analytics">Analytics</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/cameras">Cameras</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/about">About</Link>
					</li>
				</ul>
				<Switch>
					<Route path="/cameras">
						<Cameras/>
					</Route>
					<Route path="/analytics">
						<Analytics/>
					</Route>
					<Route path="/about">
						<About/>
					</Route>
					<Route path="/">
						<Home/>
					</Route>
				</Switch>
			</div>

		);
	}
}

export default Header;
