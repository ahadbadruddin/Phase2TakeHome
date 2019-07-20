import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {isLoggedIn} from '../App.js';

export default class Login extends React.Component {

  state = {
    username : "",
    password : ""
  }
  

  render() {
    if( isLoggedIn() ){
      this.props.getInfo(window.sessionStorage.getItem("ApiKey"))
      return <Redirect to="/" />
    }

    return (
      <div className="Login">

      <input id = "username" name="username" placeholder="username" value={this.state.username}
                        onChange={(event)=> {
                            this.setState({
                                username : event.target.value
                            })
                        }} />
      <input id = "password" name="password" placeholder="password" value={this.state.password}
                        onChange={(event)=> {
                            this.setState({
                                password : event.target.value
                            })
                        }} />


        <button onClick={(event) => {
          // window.sessionStorage.setItem("ApiKey", "Logged In")
          this.props.updateButton(this.state.username, this.state.password)
        }}> Login </button>

      </div>
    );

  }



}
