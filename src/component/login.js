import React from 'react'
import UserApiClient from "../service/user.api.client";
import PropTypes from "prop-types";
import {withTranslation} from 'react-i18next'

export class Login extends React.Component {

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

  static get PropTypes() {
    return{
      t: PropTypes.func //with Translation
    }
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

    switch (data.message) {
      case 'ok':
        this.setState({badPassword: false})
        this.setState({badUser: false})

        const {user} = await UserApiClient.getUser(data.userId, data.token)
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
    return (
        <div className={"login"}>
          <h1>{this.props.t("login_page.title")}</h1>
          <form
              className={"login__username"}
              onSubmit={(event) =>
                  this._submit(event)}
          >
            <label className="login__label">
              <input className={"login__username__input"}
                     type="text"
                     name="username"
                     value={this.state.username}
                     placeholder={this.props.t("login_page.placeholder.name")}
                     onChange={this.handleChange}
              />
            </label>
            <label className="login__label">
              <input className={"login__username__input"}
                     type={"text"}
                     name="password"
                     value={this.state.password}
                     placeholder={this.props.t("login_page.placeholder.password")}
                     onChange={this.handleChange}
              />
            </label>
            <button
            disabled={this.state.username === '' || this.state.password === ''}
            >Submit</button>
          </form>

          {this.state.badPassword === true
              ? (<div className={"login__errorForm"}>{this.props.t("login_page.form.error.password")}</div>)
              : null}
          {this.state.badUser === true
              ? (<div className={"login__errorForm"}>{this.props.t("login_page.form.error.user")}</div>)
              : null}
        </div>
    )
  }

}

export default (withTranslation()(Login))































