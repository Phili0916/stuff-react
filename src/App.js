import React from 'react'

import './styles/login.scss'
import './styles/App.scss'
import Login from "./component/login";
import Home from "./component/Home";


export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: ''
    }
    this._changeUser = this._changeUser.bind(this)
  }

  _changeUser(userId, jwt, user) {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("jwt", JSON.stringify(jwt))
    if (userId) {
      this.setState({"user" : this.state.user})
      console.log("###user");
      console.log(this.state.user)
    }

  }

  componentDidMount() {
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log("###this.user")
    console.log(this.user);
    if(localStorage.getItem('user')) {
      this.setState({'user': this.state.user})
    }
  //   this.setState.user = JSON.parse(localStorage.getItem('user'))
  //   if(JSON.parse(localStorage.getItem('user'))) {
  //     this.setState({'user' : this.state.user})
  //   }
  }

  greet() {
    console.log("Hello")
  }


  render() {
    console.log('this.state.userId')
    console.log(this.state.user)

    return (
        <>
          {!this.state.user
              ? (<div className="App">
                  <Login
                      onAuthenticationSuccess={(userId, jwt, user) => this._changeUser(userId, jwt, user)}/>
                </div>)
              : (

                  <Home
                      greet={this.greet}
                      user={this.state.user}
                      changeUser={this._changeUser.bind(this)}
                  />
              )
          }
        </>
    )
  }

}


