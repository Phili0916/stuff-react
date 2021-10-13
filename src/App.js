import React from 'react'

import './styles/login.scss'
import './styles/App.scss'
import Login from "./component/login";


export default class App extends React.Component{



  _changeUser(user){
    console.log(user)
  }

  render(){
    return (
      <div className="App">
        <Login
        onAuthenticationSuccess={(user)=>this._changeUser(user)}/>
      </div>
    );
  }

}


