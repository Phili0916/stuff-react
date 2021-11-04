import React from 'react'
import UserApiClient from "../service/user.api.client";

export default class CreateUser extends React.Component {
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
    try {
      const results = await UserApiClient.signup(body)
      console.log('submit createUser results', results)
      this.setState({createUserSuccess: true})
      console.log('create user results', results.message)
      console.log('this.state.createUserSuccess', this.state.createUserSuccess)
    } catch(e) {
      const error = e.errors
      console.log('error', error)
      this.setState({createUserError: true})
      console.log('this.state.createUserError', this.state.createUserError)
    }
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
            {this.state.createUserError === true && this.state.addFirstName === undefined
                ? (<div className={"user__errorForm"}>You must enter a valid First Name</div>)
                : null}
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
            {this.state.createUserError === true && this.state.addLastName === undefined
                ? (<div className={"user__errorForm"}>You must enter a valid Last Name</div> )
                : null}
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
            {this.state.createUserError === true && this.state.addEmail === undefined
                ? (<div className={"user__errorForm"}>You must add a valid and unique Email</div> )
                : null}
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
            {this.state.createUserError === true && this.state.addPassword === undefined
                ? (<div className={"user__errorForm"}>You must enter a valid Password</div> )
                : null}
            <div className={"user__form__button"}>
              <button type={"submit"}
                      onClick={(event) =>
                      this._submit(event)}>Register
              </button>
            </div>
          </form>

          {this.state.createUserSuccess === true &&
              this.state.addFirstName !== undefined &&
              this.state.addLastName !== undefined &&
              this.state.addEmail !== undefined &&
              this.state.addPassword !== undefined
              ? (<div className={"user__successForm"}>
                  <h2>You have Registered Successfully {this.state.addFirstName} {this.state.addLastName}</h2>
                </div> )
              : null}
        </div>
    )
  }

}