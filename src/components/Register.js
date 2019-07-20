import React from 'react';



export default class Register extends React.Component{
    state = {
        username : "",
        password : "",
        realname:"",
        repassword:"",
        returned:""
      }
     returnedState= (string)=> {
        this.setState({
          returned: string
        })
      
      }

render(){

    return (
        <div className="Register">
  
        <input id = "realname" name="realname" placeholder="realname" value={this.state.realname}
                          onChange={(event)=> {
                              this.setState({
                                realname : event.target.value
                              })
                          }} />
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
        <input id = "password2" name="password2" placeholder="reenter password" value={this.state.repassword}
                          onChange={(event)=> {
                              this.setState({
                                  repassword : event.target.value
                              })
                          }} />
  
  
          <button onClick={(event) => {
            // window.sessionStorage.setItem("ApiKey", "Logged In")
            
            this.props.register(this.state.username, this.state.password, this.state.realname, this.state.repassword)
            this.forceUpdate()
            this.forceUpdate()

  
          }}> Register </button>

          <h1>{window.sessionStorage.getItem("message")}</h1>

        </div>
      );
        }

}