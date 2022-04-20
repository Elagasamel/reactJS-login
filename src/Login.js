import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Dashboard from './Dashboard';

var apiBaseUrl = "http://localhost:8080/";
//var apiBaseUrl ="http://ec2-52-73-241-191.compute-1.amazonaws.com/TekReinvent/";	

class Login extends Component {
  constructor(props) {
    super(props);
    var localloginComponent = [];
    localloginComponent.push(
      <MuiThemeProvider>
        <AppBar title="Login" />
        <div>
          <TextField
            hintText="Enter your Email Id"
            floatingLabelText="Email Id"
            onChange={(event, newValue) => this.setState({ username: newValue })} />
          <br />
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange={(event, newValue) => this.setState({ pwd: newValue })} />
          <br />
          <RaisedButton label="Login" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
        </div>
      </MuiThemeProvider>
    )
    this.state = {
      username: '',
      pwd: '',
      loginComponent: localloginComponent
    }
  }

  handleClick(event) {
    var self = this;
    var username = this.state.username;
    var pwd = this.state.pwd;

    var payload = {
      "email": username,
    }
    var token = username + ':' + pwd;
    var head = window.btoa(token);

    const auth = {
      headers: {
        'Authorization': 'Basic ' + head
      }
    }

    axios.post(apiBaseUrl + 'login', payload, auth)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          console.log("Login successful");
          var data = response.data;
          
          var dashBoard = [];
          dashBoard.push(<Dashboard appContext={self.props.appContext} data={data} auth={true} />)
          self.props.appContext.setState({ loginPage: [], dashboard: dashBoard })
        }
        else if (response.status === 204) {
          console.log("Username password do not match");
          alert(response.data.success)
        }
        else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
