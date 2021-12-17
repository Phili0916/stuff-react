import React from 'react'
import StuffApiClient from "../service/stuff.api.client";
import PropTypes from 'prop-types'
import {
  CATEGORY_DESKTOP, CATEGORY_HEADPHONE,
  CATEGORY_KEYBOARD, CATEGORY_LAPTOP, CATEGORY_MICROPHONE,
  CATEGORY_MISCELLANEOUS, CATEGORY_MOBILE,
  CATEGORY_MONITOR,
  CATEGORY_MOUSE,
  CATEGORY_SCREEN, CATEGORY_SPEAKERPHONE, CATEGORY_TABLET, STATUS_BROKEN, STATUS_LOST, STATUS_NEW, STATUS_USED
} from "../helper/constants";
import UserApiClient from "../service/user.api.client";

export default class UpdateStuffPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stuffToUpdate: undefined,
      updatedStuff: undefined,
      updateSuccess: false,
      updateError: false,
      stuff: undefined,
      allUsers: [],
      id: undefined
    }
  }

  static get propTypes() {
    return {
      stuff: PropTypes.object
    }
  }

  async componentDidMount() {
    const array = window.location.pathname.split('/')
    const id = array.pop()
    const params = {ownerId: "", localisation: ""}
    const stuff = await StuffApiClient.getStuffBy(JSON.parse(localStorage.getItem('jwt')), {_id: id})
    this.setState({id: stuff.stuff?._id})
    this.setState({stuffToUpdate: stuff.stuff.stuff[0]})
    const ownerIdResults = await StuffApiClient.getStuffBy(JSON.parse(localStorage.getItem('jwt')), {params})

    ownerIdResults.stuff.stuff.filter(user => user.ownerId).map(async _user => {
      const {user} = await UserApiClient.getUser(_user.ownerId, JSON.parse(localStorage.getItem('jwt')))
      this.setState(prevState => {
        if (!prevState.allUsers.map(user => user.firstName).includes(user.firstName)) {
          prevState.allUsers.push(user)
        }
        return prevState
      })
    })

  }

  async _updateStuffChange (event) {
    if (this.state.stuffToUpdate !== event.target.value) {
      if (event.target.name === 'city') {
        if (!this.state.stuffToUpdate.localisation) {
          this.setState(prevState => {
            prevState.stuffToUpdate.localisation = {}
            return prevState
          })
        }
        this.state.stuffToUpdate.localisation.city = event.target.value
        this.setState({updatedStuff: this.state.stuffToUpdate})
      } else {
        this.state.stuffToUpdate[event.target.name] = event.target.value
        this.setState({updatedStuff: this.state.stuffToUpdate})
      }
    }
  }


  async _submitUpdate(event) {
    event.preventDefault()
    await this._updateStuffChange(event)
    const body = this.state.stuffToUpdate
    const id = this.state.stuffToUpdate._id
    // const body = this.state.stuffToUpdate
    // const id = this.state.stuffToUpdate._id
    // console.log('id', id)
    // console.log('this.state.stuffToUpdate', this.state.stuffToUpdate)
    // if (this.state.stuffToUpdate !== event.target.value) {
    //   if (event.target.name === 'city') {
    //     if (!this.state.stuffToUpdate.localisation) {
    //       this.setState(prevState => {
    //         prevState.stuffToUpdate.localisation = {}
    //         return prevState
    //       })
    //     }
    //     this.state.stuffToUpdate.localisation.city = event.target.value
    //     this.setState({updatedStuff: this.state.stuffToUpdate})
    // } else {
    //     this.state.stuffToUpdate[event.target.name] = event.target.value
    //     this.setState({updatedStuff: this.state.stuffToUpdate})
    //   }
    // }
    try {
      const updateResults = await StuffApiClient.updateOneStuff(JSON.parse(localStorage.getItem('jwt')), id, body)
      this.setState({updateSuccess: true})
        if(updateResults) {
          this.setState({updateSuccess: true, selectedUserIndex: event.target.options.selectedIndex})
        }
      } catch (e) {
        const error = e.errors
        console.log(error)
        this.setState({updateError: true}
        )}
     }

  render() {
    // console.log('selectedUserIndex', this.state.selectedUserIndex)
  // console.log(this.state.allUsers)
  // console.log('this.state.stuffToUpdate', this.state.stuffToUpdate)
    // console.log('this.state.stuffToUpdate.description', this.state.stuffToUpdate)
    // console.log('this.state.updatedStuff', this.state.updatedStuff)
    // console.log('allusers', this.state.allUsers)
    // const testObject = Object.entries(this.state.allUsers).map(user =>
    //   user[1]
    // )
    // const testObject2 = Object.values(this.state.allUsers).map(user =>
    //     user?.ownerId
    // )
    // console.log(testObject, testObject2)


    return (
        this.state.stuffToUpdate ?
            (
                <div className={"updateStuff__form"}>
                  <div className={"updateStuff__form__body"}>
                    <h2 className={"updateStuff__form__title"}>Update Your Stuff</h2>
                    <form className={"updateStuff__form__container"}>
                      <div className={"addStuff__form__container__left"}>
                        <div className={"updateStuff__form__container__input"}>
                          <label className={"updateStuff__form__label__ownerId"}
                                 htmlFor={"updateOwnerId"}>OwnerID
                          </label>
                          <select className={"updateStuff__userChange__select"}
                                  name={"ownerId"}
                                  onChange={(event) => this._updateStuffChange(event)}
                                  value={this.state.stuffToUpdate.ownerId}>
                            {this.state.allUsers.map((user, index) =>
                                <option value={user._id}>{user?.firstName}</option>
                            )}
                          </select>
                        </div>
                        <div className={"updateStuff__form__container__input"}>
                          <label className={"updateStuff__form__label__title"}
                            htmlFor={"updateTitle"}>title
                          </label>
                          <input
                              className={"updateStuff__form__input__title"}
                              name={"title"}
                              type="text"
                              placeholder={"Enter the title"}
                              value={this.state.stuffToUpdate.title}
                              onChange={(event) => this._updateStuffChange(event)}
                          />
                        </div>
                        <div className={"updateStuff__form__container__input"}>
                          <label className={"updateStuff__form__label__price"}
                                 htmlFor={"updatePrice"}>Price
                          </label>
                          <input
                              className={"updateStuff__form__input__title"}
                              name={"price"}
                              type="text"
                              placeholder={"Enter the Price"}
                              value={this.state.stuffToUpdate.price}
                              onChange={(event) => this._updateStuffChange(event)}
                          />
                        </div>
                      </div>
                      {/*Part right Align*/}
                      <div className={"updateStuff__form__container__right"}>
                        <div className={"updateStuff__form__container__input"}>
                          <label className={"updateStuff__form__label__category"}
                                 htmlFor={"updateCategory"}>Category
                          </label>
                          <select className={"updateStuff__form__input__textBox"} name={"category"}
                                  value={this.state.stuffToUpdate.category}
                                  onChange={(event) => this._updateStuffChange(event)}>
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
                        <div className={"updateStuff__form__container__input"}>
                          <label className={"updateStuff__form__label__status"}
                                 htmlFor={"updateStatus"}>Update Status
                          </label>
                          <select
                              className={"updateStuff__form__input__textBox"}
                              name={"status"}
                              placeholder={"Enter the Status of your Stuff"}
                              value={this.state.stuffToUpdate.status}
                              onChange={(event) => this._updateStuffChange(event)}>
                            <option value={undefined} selected={true}>--Category--</option>
                            <option value={STATUS_NEW}>Status New</option>
                            <option value={STATUS_USED}>Status Used</option>
                            <option value={STATUS_LOST}>Status Lost</option>
                            <option value={STATUS_BROKEN}>Status Broken</option>
                          </select>
                        </div>
                        <div className={"updateStuff__form__label__input"}>
                          <label className={"updateStuff__form__label__description"}
                                 htmlFor={"updateDescription"}>Description
                          </label>
                          <input
                              className={"updateStuff__form__input__textBox"}
                              name={"description"}
                              type="text"
                              placeholder={"Enter the Stuff's Description"}
                              value={this.state.stuffToUpdate.description}
                              onChange={(event) => this._updateStuffChange(event)}
                          />
                        </div>
                        <div className={"updateStuff__form__label__input"}>
                          <label className={"updateStuff__form__label__city"}
                                 htmlFor={"updateCity"}>City
                          </label>
                          <input
                              className={"updateStuff__form__input__textBox"}
                              name={"city"}
                              type="text"
                              placeholder={"Enter a City"}
                              value={this.state.stuffToUpdate.localisation?.city}
                              onChange={(event) => this._updateStuffChange(event)}
                          />
                      </div>
                      </div>
                    </form>
                    <div className={"updateStuff__search__form__button"}>
                      <button onClick={(event) => this._submitUpdate(event)}>
                        Update
                      </button>
                    </div>
                    {this.state.updateSuccess ? (<div className={"updateStuff__successForm"}>You have Updated Your Stuff</div>)
                        :
                    this.state.updateError === true
                        ? (<div className={"updateStuff__errorForm"}>Your Stuff did not Update</div>)
                        : null }
                  </div>
                </div>
            )

            : null

    )
  }
}

