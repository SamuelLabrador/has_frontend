import React, { Component } from 'react';
import HomepageMap from './homepagemap.js';
// import NotificationWindow from './notificationwindow.js';

class Home extends Component{
	

	render(){
		return (
			<div>
				<div className="container-fluid">
					<HomepageMap/>
			    </div>
			</div>			
		);
	}
}

export default Home;