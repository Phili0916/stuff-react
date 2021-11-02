import React from "react";
import StuffApiClient from "../service/stuff.api.client";
import UserApiClient from "../service/user.api.client";
import {
  CATEGORY_DESKTOP, CATEGORY_HEADPHONE,
  CATEGORY_KEYBOARD, CATEGORY_LAPTOP, CATEGORY_MICROPHONE,
  CATEGORY_MISCELLANEOUS, CATEGORY_MOBILE,
  CATEGORY_MONITOR,
  CATEGORY_MOUSE,
  CATEGORY_SCREEN, CATEGORY_SPEAKERPHONE, CATEGORY_TABLET
} from "../helper/constants";


export default class AddStuffPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addTitle: '',
      addCategory: undefined,
      addDescription: '',
      addPrice: undefined,
      addOwnerId: undefined,
      addReference: undefined,
      addStatus: undefined,
      // userSelect: undefined,
      saveSuccess : false,
      saveError : false,
    }
  }

  async _submitStuff() {
    const body = {}

    if (this.state.addTitle !== '') {
      body.title = this.state.addTitle
    }
    if (this.state.addCategory !== undefined) {
      body.category = Number.parseInt(this.state.addCategory)
    }
    if (this.state.addDescription !== '') {
      body.description = this.state.addDescription
    }
    if (this.state.addPrice !== undefined) {
      body.price = Number.parseInt(this.state.addPrice)
    }
    if (this.state.addOwnerId !== undefined) {
      body.ownerId = this.state.addOwnerId
    }
    if (this.state.addReference) {
      body.reference = this.state.addReference
    }
    if (this.state.addStatus) {
      body.status = Number.parseInt(this.state.addStatus)
    }
    try {
      const results = await StuffApiClient.createPost(JSON.parse(localStorage.getItem('jwt')), body)
      console.log('results', results)
      switch(results.message) {
        case 'ok':
          this.setState({saveSuccess : true})
          console.log('results', results)
          console.log('message results', results.message)
        break
      }
    } catch (e) {
      const error = e.errors
      console.log('error')
      console.log(error)
      this.setState({saveError : true})
    }

  }

  async addStuffChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
    console.log('this.state.addTitle', this.state.addTitle)
  }

  // async toggleUserChange() {
  //   const userData = await UserApiClient.checkIfUsernameAndPasswordAreOK(this.state.username, this.state.password)
  //   console.log('userData', userData)
  //   const {userChange} = await UserApiClient.getUser(userData.userId, userData.token)
  //   this.props.onAuthenticationSuccess(userData.userId, userData.token, userChange)
  // }

  async _submit(event) {
    event.preventDefault()
    await this._submitStuff()
    // await this.toggleUserChange()
  }

  render() {

    const {addTitle, addCategory, addDescription, addPrice, userSelect, addOwnerId, addReference, addStatus, saveSuccess} = this.state

    return (
        <div className={"addStuff__form__container"}>
          <div className={"addStuff__form__block"}>
            <h2 className={"addStuff__form__title"}>Add Your Stuff</h2>
            <form>
              <div className={"addStuff__form__input"}>
                <input
                    className={"addStuff__form__input__textBox"}
                    name={"addTitle"}
                    type="text"
                    placeholder={"Enter the title"}
                    value={addTitle}
                    onChange={(event) => this.addStuffChange(event)}
                />
              </div>
              <div className={"addStuff__form__input"}>
                <input
                    className={"addStuff__form__input__textBox"}
                    name={"addCategory"}
                    type="text"
                    placeholder={"Enter Category of Stuff"}
                    value={addCategory}
                    onChange={(event) => this.addStuffChange(event)}
                />
              </div>
              <div className={"addStuff__form__input"}>
                <input
                    className={"addStuff__form__input__textBox"}
                    name={"addDescription"}
                    type="text"
                    placeholder={"Enter the Stuff's Description"}
                    value={addDescription}
                    onChange={(event) => this.addStuffChange(event)}
                />
              </div>
              <div className={"addStuff__form__input"}>
                <input
                    className={"addStuff__form__input__textBox"}
                    name={"addPrice"}
                    type="text"
                    placeholder={"Enter the Stuff's Price"}
                    value={addPrice}
                    onChange={(event) => this.addStuffChange(event)}
                />
              </div>
              <div className={"addStuff__form__input"}>
                <select className={"addStuff__userChange__select"} name={"addOwnerId"} value={addOwnerId}
                        onChange={(event) => this.addStuffChange(event)}>
                  <option value="0">Nobody</option>
                  <option value="1">user 1</option>
                  <option value="2">user 2</option>


                </select>
                {/*<input*/}
                {/*    className={"addStuff__form__input__textBox"}*/}
                {/*    name={"addOwnerId"}*/}
                {/*    type="text"*/}
                {/*    placeholder={"Enter Your Owner Id"}*/}
                {/*    value={addOwnerId}*/}
                {/*    onChange={(event) => this.addStuffChange(event)}*/}
                {/*/>*/}
              </div>
              <div className={"addStuff__form__input"}>
                <input
                    className={"addStuff__form__input__textBox"}
                    name={"addReference"}
                    type="text"
                    placeholder={"Enter the Reference"}
                    value={addReference}
                    onChange={(event) => this.addStuffChange(event)}
                />
              </div>
              <div className={"addStuff__form__input"}>
                <input
                    className={"addStuff__form__input__textBox"}
                    name={"addStatus"}
                    type="text"
                    placeholder={"Enter the Status of your Stuff"}
                    value={addStatus}
                    onChange={(event) => this.addStuffChange(event)}
                />
              </div>
              <div className={"addStuff__search__Form__button"}>
                <button type={"submit"}
                        onClick={(event) =>
                            this._submit(event)}>Submit Stuff
                </button>
              </div>
              {this.state.saveSuccess &&(
                  <div className="addStuff__success">
                    Enregistrement réalisé
                  </div>
              )}

            </form>
          </div>
        </div>
    )
  }
}