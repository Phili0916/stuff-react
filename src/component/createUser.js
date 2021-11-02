import React from 'react'
import UserApiClient from "../service/user.api.client";

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addFirstName: undefined,
      addLastName: undefined,
      addEmail: undefined,
      addPassword: undefined
    }
  }

  async _submitCreatedUser() {
    const body = {}

    if(this.state.addFirstName !== undefined) {
      body.firstName = this.state.addFirstName
      console.log('body first name', body)
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
    const results = await UserApiClient.signup(body)
    console.log('submit createUser results', results)
  }

  async addUserChange(event) {
    await this.setState ({
      [event.target.name] : event.target.value
    })
    console.log('this.state.addFirstName', this.state.addFirstName)
  }

  async _submit(event) {
    event.preventDefault()
    await this._submitCreatedUser()
  }

  // async componentDidMount() {
  //   //TODO : get user from your database
  //   const user= JSON.parse(localStorage.getItem('user'))
  //   const userdata = await UserApiClient.getUser(user._id, JSON.parse(localStorage.getItem('jwt')))
  //   console.log("###typeof userdata");
  //   console.log(typeof 'userdata');
  // }
  render() {

    const {addFirstName, addLastName, addEmail, addPassword} = this.state

    return (
        <div className={'user__form__container'}>
          <div className={'user__form__block'}>
            <h2 className={'userRegistrationForm_title'}>Would you like to Register?</h2>
          </div>
          <form>
            <div className={"user__form__input"}>
              <input
                  className={"user__form__input__textBox"}
                  type={"text"}
                  name={"addFirstName"}
                  placeholder={"First Name"}
                  value={addFirstName}
                  onChange={(event) => this.addUserChange(event)}
              />
            </div>
            <div className={"user__form__input"}>
              <input
                  className={"user__form__input__textBox"}
                  type={"text"}
                  name={"addLastName"}
                  placeholder={"Last Name"}
                  value={addLastName}
                  onChange={(event) => this.addUserChange(event)}
              />
            </div>
            <div className={"user__form__input"}>
              <input
                  className={"user__form__input__textBox"}
                  type={"email"}
                  name={"addEmail"}
                  placeholder={"email"}
                  value={addEmail}
                  onChange={(event) => this.addUserChange(event)}
              />
            </div>
            <div className={"user__form__input"}>
              <input
                className={"user__form__input__textBox"}
                type={"password"}
                name={"addPassword"}
                placeholder={"Create Password"}
                value={addPassword}
                onChange={(event) => this.addUserChange(event)}
              />
            </div>
            <div className={"user__form__button"}>
              <button type={"submit"}
                      onClick={(event) =>
                      this._submit(event)}>Register
              </button>
            </div>
          </form>
        </div>
    )
  }

}