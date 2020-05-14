import {Route, Switch, Link} from "react-router-dom";
import React, {Component} from 'react';
import Analytics from './analytics.js';
import Cameras from './cameras.js';
import Home from './home.js';
import About from './about.js'
import { Navbar } from 'react-bootstrap';

class Header extends Component{

	render(){
		var icon_image = process.env.PUBLIC_URL + '/highway.png';
		return (
			<div>
				<Navbar bg="dark">
					
					<Link className="navbar-brand" to="/" style={{"color": "white"}}>
						<img className="d-inline-block" height="30" style={{"display": "none", "float": "left", "paddingRight": "10px"}} src={icon_image} alt= "Highway Icon"/>
						Highway Analytics System
					</Link>

					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					
					<Navbar.Collapse id="basic-navbar-nav" class="navbar-dark">
						<ul className="navbar-nav mr-auto">
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
					</Navbar.Collapse>
				</Navbar>

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
