import React, { Component } from 'react';
import HomepageMap from './homepagemap.js';
// import NotificationWindow from './notificationwindow.js';

class Home extends Component{
	

	render(){
		return (
			<div class="d-flex flex-column">
				<HomepageMap/>
			</div>			
		);
	}
}

export default Home;
