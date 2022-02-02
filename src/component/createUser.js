import React from 'react'
import UserApiClient from "../service/user.api.client";
import PropTypes from "prop-types";
import {withTranslation} from 'react-i18next'
import {SearchPage} from "./searchPage";

export class CreateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addFirstName: undefined,
      addLastName: undefined,
      addEmail: undefined,
      addPassword: undefined,
      createUserSuccess: false,
      createUserError: false
    }
  }

  static get PropTypes() {
    return{
      t: PropTypes.func //with Translation
    }
  }

  async _submitCreatedUser() {
    const body = {}

    if(this.state.addFirstName !== undefined) {
      body.firstName = this.state.addFirstName
    }
    if(this.state.addLastName !== undefined) {
      body.lastName = this.state.addLastName
    }
    if(this.state.addEmail) {
      body.email = this.state.addEmail
    }
    if(this.state.addPassword) {
      body.password = this.state.addPassword
    }
    try {
      const results = await UserApiClient.signup(body)
      console.log('submit createUser results', results)
      this.setState({createUserSuccess: true})
    } catch(e) {
      const error = e.errors
      console.log('error', error)
      this.setState({createUserError: true})
    }
  }

  async addUserChange(event) {
    await this.setState ({
      [event.target.name] : event.target.value
    })
  }

  async _submit(event) {
    event.preventDefault()
    await this._submitCreatedUser()
  }

  render() {

    const {addFirstName, addLastName, addEmail, addPassword} = this.state

    return (
        <div className={'user__form__container'}>
          <div className={'user__form__block'}>
            <h2 className={'userRegistrationForm__title'}>{this.props.t("create_user.title")}</h2>
          </div>
          <form>
            <div className={"user__form__input"}>
              <input
                  className={"user__form__input__textBox"}
                  type={"text"}
                  name={"addFirstName"}
                  placeholder={this.props.t("create_user.placeholder.first_name")}
                  value={addFirstName}
                  onChange={(event) => this.addUserChange(event)}
              />
            </div>
            {this.state.createUserError === true && this.state.addFirstName === undefined
                ? (<div className={"user__errorForm"}>You must enter a valid First Name</div>)
                : null}
            <div className={"user__form__input"}>
              <input
                  className={"user__form__input__textBox"}
                  type={"text"}
                  name={"addLastName"}
                  placeholder={this.props.t("create_user.placeholder.last_name")}
                  value={addLastName}
                  onChange={(event) => this.addUserChange(event)}
              />
            </div>
            {this.state.createUserError === true && this.state.addLastName === undefined
                ? (<div className={"user__errorForm"}>You must enter a valid Last Name</div> )
                : null}
            <div className={"user__form__input"}>
              <input
                  className={"user__form__input__textBox"}
                  type={"email"}
                  name={"addEmail"}
                  placeholder={this.props.t("create_user.placeholder.email")}
                  value={addEmail}
                  onChange={(event) => this.addUserChange(event)}
              />
            </div>
            {this.state.createUserError === true && this.state.addEmail === undefined
                ? (<div className={"user__errorForm"}>You must add a valid and unique Email</div> )
                : null}
            <div className={"user__form__input"}>
              <input
                className={"user__form__input__textBox"}
                type={"password"}
                name={"addPassword"}
                placeholder={this.props.t("create_user.placeholder.password")}
                value={addPassword}
                onChange={(event) => this.addUserChange(event)}
              />
            </div>
            {this.state.createUserError === true && this.state.addPassword === undefined
                ? (<div className={"user__errorForm"}>You must enter a valid Password</div> )
                : null}
            <div className={"user__form__button"}>
              <button type={"submit"}
                      onClick={(event) =>
                      this._submit(event)}>{this.props.t("create_user.button.register")}
              </button>
            </div>
          </form>

          {this.state.createUserSuccess === true &&
              this.state.addFirstName !== undefined &&
              this.state.addLastName !== undefined &&
              this.state.addEmail !== undefined &&
              this.state.addPassword !== undefined
              ? (<div className={"user__successForm"}>
                  <h2>{this.props.t("create_user.register_form.success.message")} {this.state.addFirstName} {this.state.addLastName}</h2>
                </div> )
              : null}
        </div>
    )
  }

}

export default withTranslation()(CreateUser)