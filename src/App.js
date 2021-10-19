import React from 'react'

import './styles/login.scss'
import './styles/App.scss'
import Login from "./component/login";
import Home from "./component/Home";


export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: undefined
    }
  }

  async _changeUser(userId, jwt, user) {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("jwt", JSON.stringify(jwt))
    if (userId) {
      await this.setState({user : user})
    }

  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user) {
      await this.setState({user: user})
    }

    if(JSON.parse(localStorage.getItem('user'))) {
      await this.setState({user : user})
    }
  }

  greet() {
    console.log("Hello")
  }


  render() {
    return (
        <>
          {!this.state.user
              ? (<div className="App">
                  <Login
                      onAuthenticationSuccess={async (userId, jwt, user) => await this._changeUser(userId, jwt, user)}/>
                </div>)
              : (

                  <Home
                      greet={this.greet}
                      user={this.state.user}
                  />
              )
          }
        </>
    )
  }

}


