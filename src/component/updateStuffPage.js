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
      stuff : PropTypes.object
    }
  }

  async componentDidMount() {
    const array = window.location.pathname.split('/')
    const id = array.pop()
    const params = {ownerId: ""}
    const stuff = await StuffApiClient.getStuffBy(JSON.parse(localStorage.getItem('jwt')), {_id: id})
    this.setState({id : stuff.stuff?._id})
    this.setState({stuffToUpdate : stuff.stuff.stuff[0]})
    const ownerIdResults = await StuffApiClient.getStuffBy(JSON.parse(localStorage.getItem('jwt')), {params })
    console.log('results', ownerIdResults.stuff.stuff)
    this.setState({allUsers: ownerIdResults})
    // const allUsers = await UserApiClient.getAllUsers(JSON.parse(localStorage.getItem('jwt')))
    // this.setState({allUsers: allUsers.users})
    // console.log('allUsers', allUsers)
    // console.log('stuff', typeof stuff)
    // this.setState({stuff : stuff.stuff.stuff[0]})
    // this.setState({ownerId: stuff.stuff.stuff[0]})
    // console.log('ownerId', ownerId)
    // const user= await UserApiClient.getUser(this.props.stuff, JSON.parse(localStorage.getItem('jwt')))
    // console.log(user, 'USERRRRRRRRS')
    // console.log("this.props.allStuff.stuff.ownerId", this.props.allStuff.stuff.stuff[0].ownerId)
    console.log(stuff)
  }

  // async _updateStuffChange(event) {
  //   await this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }


  async _submitUpdate(event) {
    event.preventDefault()
    // await this._updateStuffChange(event)
    const body = this.state.stuffToUpdate
    const id = this.state.stuffToUpdate._id
    console.log('id', id)
    console.log('this.state.stuffToUpdate', this.state.stuffToUpdate)
    if(this.state.stuffToUpdate !== event.target.value) {
      this.state.stuffToUpdate[event.target.name] = event.target.value
      this.setState({updatedStuff : this.state.stuffToUpdate})
    }
    try {
      const updateResults = await StuffApiClient.updateOneStuff(JSON.parse(localStorage.getItem('jwt')), id, body)
      if(updateResults) {
        this.setState({updateSuccess: true})
        console.log(updateResults)
      }
    } catch(e) {
      const error = e.errors
      console.log(error)
      this.setState({updateError: true})
    }
  }

  render() {
// console.log(this.state.allUsers)
// console.log('this.state.stuffToUpdate', this.state.stuffToUpdate)
    // console.log('this.state.stuffToUpdate.description', this.state.stuffToUpdate)
    console.log('this.state.updatedStuff', this.state.updatedStuff)
    return(
        this.state.stuffToUpdate ?
            (
                <>
                  <div className={"updateStuff__form__container__input"}>
                    <label className={"updateStuff__form__label__ownerId"}
                           htmlFor={"updateOwnerId"}>OwnerID
                    </label>
                    <select className={"updateStuff__userChange__select"} name={"ownerId"} value={this.state.stuffToUpdate.ownerId}
                            onChange={(event) => this._submitUpdate(event)}>
                      <option name={"ownerId"} value="0">Nobody</option>
                      {Object.entries(this.state.allUsers).map(user =>
                          <option value={this.state.stuffToUpdate.ownerId}>{user?.firstName}</option>
                      )}
                    </select>
                  </div>
                  <div className={"updateStuff__form__container__input"}>
                    <label className={"updateStuff__form__label__title"}
                           htmlFor={"updateTitle"}>Title
                    </label>
                      <input
                          className={"updateStuff__form__input__title"}
                          name={"title"}
                          type="text"
                          placeholder={"Enter the title"}
                          value={this.state.stuffToUpdate.title}
                          onChange={(event) => this._submitUpdate(event)}
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
                          onChange={(event) => this._submitUpdate(event)}
                      />
                  </div>
                  <div className={"updateStuff__form__container__input"}>
                    <label className={"updateStuff__form__label__category"}
                           htmlFor={"updateCategory"}>Category
                    </label>
                    <select className={"updateStuff__form__category__select"} name={"category"} value={this.state.stuffToUpdate.category}
                            onChange={(event) => this._submitUpdate(event)}>
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
                  <div>
                    <label className={"updateStuff__form__label__status"}
                           htmlFor={"updateStatus"}>Update Status
                    </label>
                    <select
                        className={"updateStuff__form__input__textBox"}
                        name={"status"}
                        placeholder={"Enter the Status of your Stuff"}
                        value={this.state.stuffToUpdate.status}
                        onChange={(event) => this._submitUpdate(event)}>
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
                          onChange={(event) => this._submitUpdate(event)}
                      />
                  </div>
                  <div className={"updateStuff__form__label__input"}>
                    <label className={"updateStuff__form__label__city"}
                           htmlFor={"updateCity"}>City
                    </label>
                      <input
                        className={"updateStuff__form__input__textBox"}
                        name={"localisation"}
                        type="text"
                        placeholder={"Enter a City"}
                        value={this.state.stuffToUpdate.localisation?.city}
                        onChange={(event)=> this._submitUpdate(event)}
                      />
                  </div>
                  <button onClick={(event)=>this._submitUpdate(event)}>
                    Update
                  </button>
                </>
                )

           : null

    )
  }
}

