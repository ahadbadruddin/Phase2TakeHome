import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {isLoggedIn} from '../App.js';

export default class Login extends React.Component {

  state = {
    amount : 0
  }


  render() {

    return (
      <div className="Deposit">

      <input id = "depositamount" name="depositamount" placeholder="How much do you want to deposit?" value={this.state.amount}
                        onChange={(event)=> {
                            this.setState({
                                amount: event.target.value
                            })
                        }} />


        <button onClick={(event) => {
          // window.sessionStorage.setItem("ApiKey", "Logged In")
          this.props.deposit(window.sessionStorage.getItem("ApiKey"), this.state.amount)
        }}> Deposit </button>
      </div>
    );

  }



}
