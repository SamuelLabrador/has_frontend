import React, { Component } from 'react';

class NotificationWindow extends Component{
  constructor(props){
    super(props);
    this.state={
      //Holds list of notifications that are rendered on the screen
    }
  }
  render(){
    return(
      <div className="Notification_Window">
        Notification Window
      </div>
    )
  }
}

export default NotificationWindow;