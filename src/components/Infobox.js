import React from 'react';
import {Link} from 'react-router-dom'
import {isLoggedIn} from '../App.js';


export default function Navbar(props) {
  if( isLoggedIn() ){
    return (
      <div>
        <h1> Api Key: {window.sessionStorage.getItem("ApiKey")}</h1>
        <h2> Username: {window.sessionStorage.getItem("username")}</h2>
        <h2> Full Name: {window.sessionStorage.getItem("fullname")}</h2>
        <h2> Balance: {window.sessionStorage.getItem("balance")}</h2>
      </div>
    )
  }
  return (
    null
  );


}
