import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import Placeholder from './components/Placeholder';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Infobox from './components/Infobox'
import Deposit from './components/Deposit'
import Register from './components/Register'
import Popup from "reactjs-popup";





export function isLoggedIn() {

  return (
    window.sessionStorage.getItem("ApiKey") ? true : false
  )
}


export default class App extends React.Component {
  state = {

  };

  render() {


  return (

    <BrowserRouter>

      <div className="App">

      {isLoggedIn() ? "Logged In" : "Not Logged In" }

      <h1> Web Trader </h1>

      <Navbar status={this.state.loggedin} logout={this.logout}/>
      <Infobox />

      <Route exact path = "/"
        render={(props) => <Placeholder{...props} message="Home"/>}/>

      <Route exact path = "/lookup"
        render={(props) => <Placeholder{...props} message="Lookup"/>}/>

      <Route exact path = "/login"
        render={(props) => <Login{...props} updateButton={this.updateButton} getInfo={this.getInfo}  />}/>

      <Route exact path = "/deposit"
        render={(props) => <Deposit{...props}  deposit={this.deposit} getInfo={this.getInfo}  />}/>

      <Route exact path = "/register"
        render={(props) => <Register{...props} register={this.register}  />}/>


      </div>
    </BrowserRouter>
  );

}

logout = (event) => {
  window.sessionStorage.setItem("ApiKey", "")
  window.sessionStorage.setItem("username", "")
  window.sessionStorage.setItem("fullname", "")
  window.sessionStorage.setItem("balance", "")
  this.forceUpdate()

}



getInfo = (Api_Key) => {
  /* get the username, full name, and balance of the logged in user */
const api_key = Api_Key
const url = `http://127.0.0.1:5000/api/account_info/${api_key}`
const promise = fetch(url)
promise.then(blob => blob.json()).then(json => {
  console.log(json)
  window.sessionStorage.setItem("username", json.username)
  window.sessionStorage.setItem("fullname", json.realname)
  window.sessionStorage.setItem("balance", json.balance)
  this.forceUpdate()

})
}

deposit = (api_key,amount) => {
  const url = "http://127.0.0.1:5000/api/deposit/" + `${api_key}`
  const promise = fetch(url,{
  method: "post",
  mode: "cors",
  headers:{
    "content-type" : "application/json"

  },
  body: JSON.stringify({
    amount : Number(amount)
  })
  })
  promise.then(blob => blob.json()).then(json => {
  console.log(json)
  if(json.api_key !== undefined){
  window.sessionStorage.setItem("ApiKey", json.api_key)
  this.forceUpdate()
  }
  else{
    console.log("bad credentials")
  }
  }).catch(e=>{
    console.log("promise exception", e)
  })
  /* get api_key and save it in sessionStorage */


}



updateButton = (username, password) => {
  console.log(username,password);
  const url = "http://127.0.0.1:5000/api/get_api_key"
  const promise = fetch(url,{
  method: "post",
  mode: "cors",
  headers:{
    "content-type" : "application/json"

  },
  body: JSON.stringify({
    username : username,
    password : password
  })
  })
  promise.then(blob => blob.json()).then(json => {
  console.log(json)
  if(json.api_key !== undefined){
  window.sessionStorage.setItem("ApiKey", json.api_key)
  this.forceUpdate()
  }
  else{
    console.log("bad credentials")
  }
  }).catch(e=>{
    console.log("promise exception", e)
  })
  /* get api_key and save it in sessionStorage */


}

register = (username, password, realname, repassword) => {
  if(password===repassword){
    
  const url = "http://127.0.0.1:5000/api/create_account"
  const promise = fetch(url,{
  method: "POST",
  mode: "cors",
  headers:{
    "content-type" : "application/json"

  },
  body: JSON.stringify({
    username : username,
    password : password,
    realname: realname
  })
  })
  
  promise.then(blob => blob.json()).then(json => {
    if(json.error === "username exists"){
      console.log(json)
      window.sessionStorage.setItem("message", "Username Exists. Please resubmit form with different username")  
      this.forceUpdate()

    }
    else{
      window.sessionStorage.setItem("message", "New User Created")  
      this.forceUpdate()

    }
  })
}
else{
  window.sessionStorage.setItem("message", "passwords do not match")
  this.forceUpdate()

  console.log("passwords do not match")

}

}

 


}

