import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';
import { Auth, Analytics, AmazonPersonalizeProvider } from 'aws-amplify';
import awsconfig from './aws-exports';
Analytics.addPluggable(new AmazonPersonalizeProvider());

Amplify.configure(awsconfig);
Analytics.configure({
  AmazonPersonalize: {
  
      // REQUIRED - The trackingId to track the events 
      trackingId: 'dcde93cbd-6bc4-4121-bd3f-20f2640c8863',
      
      // OPTIONAL -  Amazon Personalize service region
      region: 'us-east-1',

      // OPTIONAL - The number of events to be deleted from the buffer when flushed.
      flushSize: 10,

      // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
      flushInterval: 5000, // 5s
  }
});


class App extends Component {
  state = {username: ''}

  async componentDidMount() {
  try {
    const user = await Auth.currentAuthenticatedUser()
    this.setState({ username: user.username })
  } catch (err) {
    console.log('error getting user: ', err)
  }
}



recordEvent = () => {
  Analytics.record({
    eventType: "Event", 
    properties: {
      "USER_ID": "11111111",
      "ITEM_ID": "click"
     }
  },
  "AmazonPersonalize");
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={this.recordEvent}>Record Event</button>
        </header>
      </div>
    );
  }
}

export default App;
