import React from 'react';
import {Link} from 'react-router-dom'
import {isLoggedIn} from '../App.js';


export default function Navbar(props) {
  if (isLoggedIn()) {


    return (
      <nav className="Navbar">
        <Link to="/">Home</Link>
        <Link to="/Deposit">Deposit</Link>
        <Link to="/sell">Sell</Link>
        <button onClick={(event) => {
          props.logout()
        }}> Logout </button>


      </nav>
    )
  }
  return (
      <nav className="Navbar">
        <Link to="/">Home</Link>
        <Link to="/lookup">Lookup</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

  )
}
