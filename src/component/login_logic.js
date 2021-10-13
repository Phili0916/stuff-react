import React from 'react'
import Login_display from "./login_display";


export default class Login_logic extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  _submit(event) {
    event.preventDefault()
    alert('Form was submitted')
    // TODO 3 : when you submit your form, you request your service in order to check if the username and password are correct
  }
  render() {
    return (
        <Login_display
          handleChange={this.handleChange}
          _submit={this._submit}
          data={this.state}
        />
    )
  }
}
console.log("##Login_Display");
console.log(Login_display)




























          {/*<div className={"login__password"}>*/}
          {/*  /!*TODO 2 : when you change the input, the state is updated*!/*/}
          {/*  <input type={"password"}*/}
          {/*         name={"login-password"}*/}
          {/*         placeholder={"put your password"}/>*/}
          {/*</div>*/}
          {/*/!*<div className={"login__submitButton"}>*!/*/}
          {/*/!*  <input type="submit" value ="Se connecter" name="login-submit"*!/*/}
          {/*/!*  onClick={()=>this._submit()}/>*!/*/}




