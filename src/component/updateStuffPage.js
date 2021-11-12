import React from 'react'
import StuffApiClient from "../service/stuff.api.client";
import PropTypes from 'prop-types'
import {
  CATEGORY_DESKTOP, CATEGORY_HEADPHONE,
  CATEGORY_KEYBOARD, CATEGORY_LAPTOP, CATEGORY_MICROPHONE,
  CATEGORY_MISCELLANEOUS, CATEGORY_MOBILE,
  CATEGORY_MONITOR,
  CATEGORY_MOUSE,
  CATEGORY_SCREEN, CATEGORY_SPEAKERPHONE, CATEGORY_TABLET
} from "../helper/constants";

export default class UpdateStuffPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stuffToUpdate: undefined,
      updatedStuff: undefined,
      updateSuccess: false,
      updateError: false
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
    const {stuff} = await StuffApiClient.getStuffBy(JSON.parse(localStorage.getItem('jwt')), {_id: id})
    console.log(stuff.stuff[0]._id)
    this.setState({id : stuff.stuff[0]._id})
    this.setState({stuffToUpdate : stuff.stuff[0]})
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

    if(this.state.stuffToUpdate !== event.target.value) {
      this.state.stuffToUpdate[event.target.name] = event.target.value
      this.setState({updatedStuff : this.state.stuffToUpdate})
      console.log(this.state.updatedStuff)
    }
    try {
      const updateResults = await StuffApiClient.updateOneStuff(JSON.parse(localStorage.getItem('jwt')), this.state.id, body)
      this.setState({updateSuccess: true})
      console.log('updateResults', updateResults)
    } catch(e) {
      const error = e.errors
      console.log(error)
      this.setState({updateError: true})
    }

  }

  // _update() {
  //   // event.preventDefault()
  //   this._submitUpdates()
  //       .then(stuffUpdated=>{
  //         console.log(stuffUpdated)
  //       })
  // }


  // async updateStuffSearch() {
  //   const updateResults =
  // }


  //
  // async addStuffChange(event) {
  //   await this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  render() {
    console.log('this.state.stuffToUpdate')
    console.log(this.state.stuffToUpdate)

    return(
        this.state.stuffToUpdate ?
            (
                <>
                  <div className={"addStuff__form__container__input"}>
                    <label className={"addStuff__form__label__title"} htmlFor={"addTitle"}>Title (*)
                    </label>
                      <input
                          className={"addStuff__form__input__title"}
                          name={"title"}
                          type="text"
                          placeholder={"Enter the title"}
                          value={this.state.stuffToUpdate.title}
                          onChange={(event) => this._submitUpdate(event)}
                      />
                  </div>
                  <div className={"addStuff__form__container__input"}>
                    <label className={"addStuff__form__label__title"} htmlFor={"addTitle"}>Title (*)
                    </label>
                      <input
                          className={"addStuff__form__input__title"}
                          name={"title"}
                          type="text"
                          placeholder={"Enter the title"}
                          value={this.state.stuffToUpdate.price}
                          onChange={(event) => this._submitUpdate(event)}
                      />
                  </div>
                  <div>
                    <select className={"form__category__select"} name="categorySearch" value={this.state.stuffToUpdate.category}
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
                  <button onClick={(event)=>this._submitUpdate(event)}>
                    Update
                  </button>
                </>
                )

           : null

    )
  }
}

