import React from 'react'
import UserApiClient from "../service/user.api.client";

export default class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userdata: undefined
    }
  }

  // async componentDidMount() {
  //   //TODO : get user from your database
  //   const user= JSON.parse(localStorage.getItem('user'))
  //   const userdata = await UserApiClient.getUser(user._id, JSON.parse(localStorage.getItem('jwt')))
  //   console.log("###typeof userdata");
  //   console.log(typeof 'userdata');
  // }
  render() {
    return (
        <div className={'user__form__container'}>
          <div className={'user__form__block'}>
            <h2 className={'userRegistrationForm_title'}>Would you like to Register?</h2>
          </div>
          <form>
            <div className={"user__form__input"}></div>
              <input
                  className={"user__form__input__textBox"}
                  type="text"
                  placeholder={"First Name"}
                  name={"firstName"}
              />
            <div className={"user__form__input"}></div>
            <input
                className={"user__form__input__textBox"}
                type="text"
                placeholder={"Last Name"}
                name={"lastName"}
            />
            <div className={"user__form__input"}></div>
            <input
                className={"user__form__input__textBox"}
                type="text"
                placeholder={"email"}
                name={"email"}
            />
            <div className={"user__form__button"}>
              <button type={"submit"}>Register</button>
            </div>
          </form>
        </div>
    )
  }

}