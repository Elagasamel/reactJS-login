import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
//import { HardwareDesktopWindows } from 'material-ui/svg-icons';

var apiBaseUrl = "http://localhost:8080/";
//var apiBaseUrl ="http://ec2-52-73-241-191.compute-1.amazonaws.com/TekReinvent/";	

const style = {
    margin: 15,
};

class Register extends Component {
    constructor(props) {
        super(props);

        var registerComponent = [];
        registerComponent.push(
            <div >
                <MuiThemeProvider >
                    <div >
                        <AppBar title="Register" />
                        <TextField hintText="Enter your First Name"
                            floatingLabelText="First Name"
                            onChange={
                                (event, newValue) => this.setState({
                                    firstName: newValue
                                })
                            }
                        /> <br />
                        <TextField hintText="Enter your Last Name"
                            floatingLabelText="Last Name"
                            onChange={
                                (event, newValue) => this.setState({
                                    lastName: newValue
                                })
                            }
                        /> <br />
                        <TextField hintText="Enter Your Email Address"
                            floatingLabelText="Email Id"
                            onChange={
                                (event, newValue) => this.setState({
                                    email: newValue
                                })
                            }
                        /> <br />
                        <TextField type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={
                                (event, newValue) => this.setState({
                                    password: newValue
                                })
                            }
                        /> <br />
                        <TextField hintText="Enter your Mobile Number"
                            floatingLabelText="Mobile No"
                            onChange={
                                (event, newValue) => this.setState({
                                    phone: newValue
                                })
                            }
                        /> <br />
                        <TextField hintText="Enter your Address"
                            floatingLabelText="Line 1"
                            onChange={
                                (event, newValue) => this.setState({
                                    line1: newValue
                                })
                            }
                        /> <br />
                        <TextField hintText=""
                            floatingLabelText="Line 2"
                            onChange={
                                (event, newValue) => this.setState({
                                    line2: newValue
                                })
                            }
                        /> <br />
                        <TextField hintText=""
                            floatingLabelText="City"
                            onChange={
                                (event, newValue) => this.setState({
                                    city: newValue
                                })
                            }
                        /> <br />
                        <TextField hintText=""
                            floatingLabelText="State"
                            onChange={
                                (event, newValue) => this.setState({
                                    state: newValue
                                })
                            }
                        />
                        <br />
                        <TextField hintText=""
                            floatingLabelText="PIN Code"
                            onChange={
                                (event, newValue) => this.setState({
                                    pin: newValue
                                })
                            }
                        />
                        <br />
                        <RaisedButton label="Proceed" primary={true} style={style} onClick={(event) => this.registerClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        )



        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            line1: '',
            line2: '',
            city: '',
            state: '',
            pin: '',
            country: 'IND',
            verified: false,
            type: 'customer',
            otp: '',
            componentDisplayed: registerComponent
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
    }


    registerClick(event) {
        var self = this;
        var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var ck_password = /^[A-Za-z0-9!@#$%^&*()_]{8,20}$/;
        var ck_mob = /^[0-9]{10}$/;
        var ck_pin = /^[0-9]{6}$/;

        var email = this.state.email;
        var phone = this.state.phone;
        var fname = this.state.firstName;
        var lname = this.state.lastName;
        var password = this.state.password;
        var pin = this.state.pin;

        var msg = "";

        if (!ck_email.test(email)) {
            msg = "You Entered a Wrong Email Address!";
        }
        else if (!ck_password.test(password)) {
            msg = "Password Doesn't match the criteria\n Size > 8 letters\n Alphanumerals + !@#$%^&*()_ only!";
        }
        else if (!ck_mob.test(phone)) {
            msg = "You Entered Wrong Mobile number. \n Don't Add +91!";
        }
        else if (fname.length < 1 && lname.length < 1) {
            msg = "Name Fields can't be null.";
        }
        else if (!ck_pin.test(pin)) {
            msg = "Wrong PIN Code!!!"

        }
        else {

            var payload = {
                "name": {
                    "firstName": fname,
                    "lastName": lname
                },
                "email": email,
                "phone": phone,
                "verified": this.state.verified,
                "type": this.state.type,
                "address": [{
                    "hno": this.state.line1,
                    "street": this.state.line2,
                    "city": this.state.city,
                    "state": this.state.state,
                    "pin": this.state.pin,
                    "country": this.state.country
                }],
                "password": password
            }

            //console.log(payload);

            axios.post(apiBaseUrl + 'register', payload)
                .then(function (response) {

                    console.log(response);

                    if (response.status === 200) {
                        msg = "Details Sent To Server";

                        //console.log(self.state);
                        var verifyComponent = [];
                        verifyComponent.push(
                            <MuiThemeProvider>
                                <div>
                                    <AppBar title="Verify" />
                                    <TextField
                                        defaultValue={self.state.phone}
                                        floatingLabelText="Phone Number" />
                                    <br />
                                    <TextField
                                        hintText="OTP"
                                        floatingLabelText="OTP"
                                        onChange={(event, newValue) => self.setState({ otp: newValue })} />
                                    <br />
                                    <RaisedButton label="Verify" primary={true} style={style} onClick={(event) => self.verifyClick(event)} />
                                </div>
                            </MuiThemeProvider>
                        )

                        self.setState({ componentDisplayed: verifyComponent });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    msg = "Error Occured!"
                });
        }
        window.alert(msg);
    }

    verifyClick(event) {
        var self = this;
        var payload = {
            "otp": this.state.otp,
            "phone": this.state.phone
        }


        axios.post(apiBaseUrl + 'validateOTP', payload)
            .then(function (response) {

                console.log(response);
                if (response.status === 200) {
                    console.log("Verification successful");

                    var loginscreen = [];
                    loginscreen.push(< Login parentContext={this} appContext={self.props.appContext} />);

                    var loginmessage = "Not Registered yet.Go to registration";
                    self.props.parentContext.setState({
                        loginscreen: loginscreen,
                        loginmessage: loginmessage,
                        buttonLabel: "Register",
                        isLogin: false
                    });
                }
                else {
                    console.log("Wrong OTP", response.status);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {

        return (
            <div>
                {this.state.componentDisplayed}
            </div>

        );
    }
}


export default Register;