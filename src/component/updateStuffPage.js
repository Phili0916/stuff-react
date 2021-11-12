import React from 'react'
import StuffApiClient from "../service/stuff.api.client";
import PropTypes from 'prop-types'

export default class UpdateStuffPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stuffToUpdate: undefined
    }
        console.log('props in update', this.props.stuff)
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
    this.setState({stuffToUpdate : stuff.stuff[0]})
  }

  async _submitUpdates() {
    const body = {}


    if(updateResults) {
      await this.setState({'updateResults': updateResults})
    }
    const updateResults = await StuffApiClient.updateOneStuff(JSON.parse(localStorage.getItem('jwt')), this.props.stuff.id, body)

    console.log(updateResults)
  }

  async _submit(event) {
    event.preventDefault()
    await this._submitUpdates()
  }


  // async updateStuffSearch() {
  //   const updateResults =
  // }

  render() {
    console.log(this.state.stuffToUpdate)
    return(
        <div className={"updateStuff__form__container"}>
          <div className={"updateStuff__form__titleBlock"}>
            <h2 className={"updateStuff__form__title"}>Which Stuff would you like to update?</h2>
          </div>
          <form>
            <div className={"updateStuff__form__input"}>
              <input
                  className={"updateStuff__form__input__textBox"}
                  type={"text"}
              />
            </div>
            <div className={"updateStuff__form__button"}>
              <button
                  type={"submit"}
                  onClick={(event)=>
                    this._submit(event)}>Update
              </button>
            </div>
          </form>
        </div>
    )
  }
}

