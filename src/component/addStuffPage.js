import React from "react";
import StuffApiClient from "../service/stuff.api.client";
import UserApiClient from "../service/user.api.client";
import {
  STATUS_NEW, STATUS_USED, STATUS_LOST, STATUS_BROKEN,
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
      addOwnerId: 0,
      addReference: undefined,
      addStatus: undefined,
      // userSelect: undefined,
      saveSuccess: false,
      saveError: false,
      users: []
    }
  }

  async componentDidMount() {
    const allUsers = await UserApiClient.getAllUsers(JSON.parse(localStorage.getItem('jwt')))
    this.setState({users: allUsers.users})

  }

  async addStuffChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
    console.log('this.state.addOwnerId', this.state.addOwnerId)
  }

  async toggleUserChange() {

  }

  async _submit(event) {
    event.preventDefault()
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
    if (this.state.addOwnerId !== undefined && this.state.addOwnerId !== 0) {
      body.ownerId = this.state.addOwnerId
    }
    if (this.state.addReference !== undefined) {
      body.reference = this.state.addReference
    }
    if (this.state.addStatus !== undefined) {
      body.status = Number.parseInt(this.state.addStatus)
    }
    try {
      const results = await StuffApiClient.createPost(JSON.parse(localStorage.getItem('jwt')), body)
      console.log('results', results)
      this.setState({saveSuccess: true})
      console.log('results', results)
      console.log('message results', results.message)
      console.log('this.setState.saveSuccess', this.state.saveSuccess)
    } catch (e) {
      const error = e.errors
      console.log('error')
      console.log(error)
      this.setState({saveError: true})
      console.log('this.setState.saveError', this.state.saveError)
    }

    // await this.toggleUserChange()
  }

  render() {
    console.log(this.state.addOwnerId)
    const {
      addTitle,
      addCategory,
      addDescription,
      addPrice,
      userSelect,
      addOwnerId,
      addReference,
      addStatus,
      saveError
    } = this.state

    return (
        <div className={"addStuff__form"}>
          <div className={"addStuff__form__body"}>
            <h2 className={"addStuff__form__title"}>Add Your Stuff</h2>
            <form className={"addStuff__form__container"}>

              <div className={"addStuff__form__container__left"}>
                <div className={"addStuff__form__container__input"}>
                  <label className={"addStuff__form__label__title"} htmlFor={"addTitle"}>Title (*)

                    {saveError === true && addTitle === ''
                        ? (<div className={"addStuff__errorForm"}>You must Enter a Title for your Stuff</div>)
                        : null}
                  </label>
                  <input
                      className={"addStuff__form__input__title"}
                      name={"addTitle"}
                      type="text"
                      placeholder={"Enter the title"}
                      value={addTitle}
                      onChange={(event) => this.addStuffChange(event)}
                  />
                </div>
                <div className={"addStuff__form__container__input"}>
                  <label className={"addStuff__form__label__category"} htmlFor={"addCategory"}>Category (*) </label>
                  <select
                      className={"addStuff__form__input__textBox"}
                      name={"addCategory"}
                      placeholder={"Enter Category of Stuff"}
                      value={addCategory}
                      onChange={(event) => this.addStuffChange(event)}>
                    <option value={undefined} selected={true}>--Category--</option>
                    <option value={CATEGORY_MISCELLANEOUS}>Miscellaneous</option>
                    <option value={CATEGORY_MOUSE}>Mouse</option>
                    <option value={CATEGORY_MONITOR}>Monitor</option>
                    <option value={CATEGORY_SCREEN}>Screen</option>
                    <option value={CATEGORY_KEYBOARD}>Keyboard</option>
                    <option value={CATEGORY_LAPTOP}>Laptop</option>
                    <option value={CATEGORY_DESKTOP}>Desktop</option>
                    <option value={CATEGORY_HEADPHONE}>Headphones</option>
                    <option value={CATEGORY_MICROPHONE}>Microphone</option>
                    <option value={CATEGORY_SPEAKERPHONE}>Speakerphones</option>
                    <option value={CATEGORY_MOBILE}>Mobile</option>
                    <option value={CATEGORY_TABLET}>Tablets</option>
                  </select>
                </div>
                {this.state.saveError === true && this.state.addCategory === undefined
                    ? (<div className={"addStuff__errorForm"}>You Must Choose a Category for your Stuff</div>)
                    : null}
                <div className={"addStuff__form__container__input"}>
                  <label className={"addStuff__form__label__description"}
                         htmlFor={"addDescription"}>Description </label>
                  <input
                      className={"addStuff__form__input__textBox"}
                      name={"addDescription"}
                      type="text"
                      placeholder={"Enter the Stuff's Description"}
                      value={addDescription}
                      onChange={(event) => this.addStuffChange(event)}
                  />
                </div>
                <div className={"addStuff__form__container__input"}>
                  <label className={"addStuff__form__label__price"} htmlFor={"addPrice"}>Price (*) </label>
                  <input
                      className={"addStuff__form__input__textBox"}
                      name={"addPrice"}
                      type="text"
                      placeholder={"Enter the Stuff's Price"}
                      value={addPrice}
                      onChange={(event) => this.addStuffChange(event)}
                  />
                  {this.state.saveError === true && this.state.addPrice === undefined
                      ? (<div className={"addStuff__errorForm"}>You must Give your Stuff a Price</div>)
                      : null}
                </div>
              </div>

              {/*Part right*/}
              <div className={"addStuff__form__container__right"}>
                <div className={"addStuff__form__container__input"}>
                  <label className={"addStuff__form__label__owner"} htmlFor={"addOwnerId"}>Choose an Owner Id </label>
                  <select className={"addStuff__userChange__select"} name={"addOwnerId"} value={addOwnerId}
                          onChange={(event) => this.addStuffChange(event)}>
                    <option name={"addOwnerId"} value="0">Nobody</option>
                    {this.state.users.map(user =>
                        <option value={user._id}>{user.firstName} {user.lastName}</option>
                    )}
                  </select>
                  {this.state.saveError === true && this.state.addOwnerId === undefined
                      ? (<div className={"addStuff__errorForm"}>You must add an OwnerId to your Stuff</div>)
                      : null}
                </div>
                <div className={"addStuff__form__container__input"}>
                  <label className={"addStuff__form__label__status"} htmlFor={"addStatus"}>Add a Status </label>
                  <select
                      className={"addStuff__form__input__textBox"}
                      name={"addStatus"}
                      placeholder={"Enter the Status of your Stuff"}
                      value={addStatus}
                      onChange={(event) => this.addStuffChange(event)}>
                    <option value={undefined} selected={true}>--Category--</option>
                    <option value={STATUS_NEW}>Status New</option>
                    <option value={STATUS_USED}>Status Used</option>
                    <option value={STATUS_LOST}>Status Lost</option>
                    <option value={STATUS_BROKEN}>Status Broken</option>
                  </select>
                </div>
                <div className={"addStuff__form__container__input"}>
                  <label className={"addStuff__form__label__reference"} htmlFor={"addReference"}>Choose a
                    Reference </label>
                  <input
                      className={"addStuff__form__input__textBox"}
                      name={"addReference"}
                      type="text"
                      placeholder={"Enter the Reference"}
                      value={addReference}
                      onChange={(event) => this.addStuffChange(event)}
                  />


                </div>
              </div>
              {/*{this.state.saveError === true && this.state.addReference === undefined*/}
              {/*    ? (<div className={"addStuff__errorForm"}>Your Stuff needs a Reference</div>)*/}
              {/*    : null}*/}




            </form>


            <div className={"addStuff__search__form__button"}>
              <button type={"submit"}
                  // disabled={
                  //     this.state.addTitle === '' ||
                  //     this.state.addCategory === undefined ||
                  //     this.state.addPrice === undefined ||
                  //     this.state.addOwnerId === undefined ||
                  //     this.state.addReference === undefined
                  //     }
                      onClick={(event) =>
                          this._submit(event)}>Create Stuff
              </button>
            </div>
            {this.state.saveSuccess === true &&
            this.state.addTitle !== '' &&
            this.state.addCategory !== undefined &&
            this.state.addPrice !== undefined &&
            this.state.addOwnerId !== undefined &&
            this.state.addReference !== undefined
                ? (<div className={"addStuff__successForm"}>Your Stuff has been submitted successfully</div>)
                : null}

          </div>
        </div>
    )
  }
}