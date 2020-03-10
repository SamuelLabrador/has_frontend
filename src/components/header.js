import {Route, Switch, Link} from "react-router-dom";
import React, {Component} from 'react';
// import Login from './login.js';
import Analytics from './analytics.js';
import Cameras from './cameras.js';
import Home from './home.js';
// import NotificationSignUp from './notificationsignup.js';

class Header extends Component{

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

				</ul>
				<Switch>
					<Route path="/cameras">
						<Cameras/>
					</Route>
					<Route path="/analytics">
						<Analytics/>
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
