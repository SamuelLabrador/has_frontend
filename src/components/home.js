import React, { Component } from 'react';
import HomepageMap from './homepagemap.js';
import NotificationWindow from './notificationwindow.js';

class Home extends Component{
	

	render(){
		return (
			<div>
				<div className="container-fluid">
					<HomepageMap/>
			        {/* <div className="row">
						<div className="col-9">
							<HomepageMap/>
						</div>
						<div className="col-3">
							<NotificationWindow/>
						</div>
					</div> */}
			    </div>
			</div>			
		);
	}
}

export default Home;