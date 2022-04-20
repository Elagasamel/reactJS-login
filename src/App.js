import React, { Component } from 'react';
import './App.css';
import LoginScreen from './Loginscreen.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      dashboard: []
    }
  }
  componentWillMount() {
    var loginPage = [];
    loginPage.push(<LoginScreen appContext={this} />);
    this.setState({
      loginPage: loginPage
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.loginPage}
        {this.state.dashboard}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </div>
    );
  }
}

export default App;
