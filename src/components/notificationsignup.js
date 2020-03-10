import React, { Component } from 'react';

class NotificationSignUp extends Component{
  // constructor(props){
  //   super(props);
  // }

  render(){
    return(
      <div>
        <form>
        <div>
          {/* Email Div */}
          <label for="email-input">Email</label>
            <input name="email-input" type="email" placeholder="Enter your email" required />
        </div>
        <div>
        {/* Check box Div */}
          <label for="route-checkbox"> Select Routes To Get Notifications For! </label>
            <label for="I-5">
              <input type="checkbox" name="I-5" value="I-5"/> I-5
            </label>
            <label for="SR-20">
              <input type="checkbox" name="SR-20" value="SR-20"/> SR-20
            </label>
            <label for="I-5">
              <input type="checkbox" name="US-101" value="US-101"/> US-101
            </label>
            <label for="I-80">
              <input type="checkbox" name="I-80" value="I-80"/> I-80
            </label>
            <label for="I-680">
              <input type="checkbox" name="I-680" value="I-680"/> I-680
            </label>
            <label for="I-280">
              <input type="checkbox" name="I-280" value="I-280"/> I-280
            </label>
        </div>
        <div>
          <button type="submit">Get Notifications!</button>
        </div>
        </form>
      </div>
    );
  }
}

export default NotificationSignUp;
