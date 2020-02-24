import {Route, Switch, Link} from "react-router-dom";
import React, {Component, createRef} from 'react';
import Login from './login.js';
import Analytics from './analytics.js';
import Cameras from './cameras.js';
import Home from './home.js';
import NotificationSignUp from './notificationsignup.js';

class Header extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<ul className="nav justify-content-begin">
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
						<Link className="nav-link" to="/login">Login</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/notification-signup">Sign Up For Notifications</Link>
					</li>
				</ul>
				<Switch>
					<Route path="/login">
						<Login/>
					</Route>
					<Route path="/cameras">
						<Cameras/>
					</Route>
					<Route path="/analytics">
						<Analytics/>
					</Route>
					<Route path="/notification-signup">
						<NotificationSignUp/>
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
