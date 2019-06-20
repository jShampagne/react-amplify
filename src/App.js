import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
import { Auth, Analytics } from 'aws-amplify';
import awsconfig from './aws-exports';
import { AmazonPersonalizeProvider } from 'aws-amplify';
Analytics.addPluggable(new AmazonPersonalizeProvider());

Analytics.configure({
  AmazonPersonalize: {
  
      // REQUIRED - The trackingId to track the events 
      trackingId: 'cde93cbd-6bc4-4121-bd3f-20f2640c8863',
      
      // OPTIONAL -  Amazon Personalize service region
      region: 'us-east-1',

      // OPTIONAL - The number of events to be deleted from the buffer when flushed.
      flushSize: 10,

      // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
      flushInterval: 5000, // 5s
  }
});

Amplify.configure(awsconfig);

class App extends Component {
  state = {
    username: 'jake',
    event: 'button click'
}

  async componentDidMount() {
  try {
    const user = await Auth.currentAuthenticatedUser()
    this.setState({ username: user.username })
  } catch (err) {
    console.log('error getting user: ', err)
  }
}

personalizeEvent = () => {
  Analytics.record({
    eventType: "13323232",
    userId: "user1",
    properties: {
      "itemId": "button",
      "eventValue": "click"}
},
"AmazonPersonalize");
}

recordEvent = () => {
  Analytics.record({
    name: 'Button Click',
    attributes: {
      username: this.state.username,
      event: this.state.event
    }
  });
}

recordEventTwo = () => {
  Analytics.record({
    name: 'Button Click Two',
    attributes: {
      username: 'Erik',
      event: 'Clicked Button'
    }
  });
}

recordEventThree = () => {
  Analytics.record({
    name: 'Button Click Three',
    attributes: {
      username: 'Joe',
      event: 'Clicked Button'
    }
  });
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <button  style={{ margin: 10, width: 200, height: 50, fontSize: 16}} onClick={this.personalizeEvent}>Record Personalize Event</button>
          <button style={{ margin: 10, width: 200, height: 50, fontSize: 16}} onClick={this.recordEvent}>Record Event One</button>
          <button style={{ margin: 10, width: 200, height: 50, fontSize: 16}} onClick={this.recordEventTwo}>Record Event Two</button>
          <button style={{ margin: 10, width: 200, height: 50, fontSize: 16}} onClick={this.recordEventThree}>Record Event Three</button>
        </header>
      </div>
    );
  }
}

export default App;
