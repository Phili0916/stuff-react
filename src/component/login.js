import React from 'react'
import UserApiClient from "../service/user.api.client";

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      badPassword: false,
      badUser: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }
  async _submit(event) {
    event.preventDefault()
    //alert('Form was submitted')

    const data = await UserApiClient.checkIfUsernameAndPasswordAreOK(this.state.username, this.state.password)

    console.log("###data")
    console.log(data);


    switch (data.message) {
      case 'ok':
        this.setState({badPassword: false})
        this.setState({badUser: false})
        console.log(this)
        // TODO : get the user by its id
          const user = await UserApiClient.getUser(data.userId, data.token)
        console.log('#####USER', user)
          console.log("###data.userId")
        console.log(data.token);


        this.props.onAuthenticationSuccess(data.userId, data.token, user)
        break
      case 'user not found':
        this.setState({badUser: true})
        this.setState({badPassword: false})
        break
      case 'bad password' :
        this.setState({badPassword: true})
        break
      default:
        break;
    }
  }
  render() {
    // console.log(this.state)
    return (
        <div className={"login"}>
          <h1>React Form</h1>
          <form
              className={"login__username"}
              onSubmit={(event) =>
                  this._submit(event)}
              // action={"zer"}
          >
            <label>
              <input className={"login__username__input"}
                     type="text"
                     name="username"
                     value={this.state.username}
                     placeholder="User Name"
                     onChange={this.handleChange}
              />
            </label>
            <label>
              <input className={"login__username__input"}
                     type={"text"}
                     name="password"
                     value={this.state.password}
                     placeholder="Enter Password"
                     onChange={this.handleChange}
              />
            </label>
            <button
            disabled={this.state.username === '' || this.state.password === ''}
            >Submit</button>
          </form>

          {this.state.badPassword === true
              ? (<div className={"login__errorForm"}>Password is not correct</div>)
              : null}
          {this.state.badUser === true
              ? (<div className={"login__errorForm"}>User Name is not valid</div>)
              : null}

        </div>
    )
  }

}

































