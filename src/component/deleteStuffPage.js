import React from "react";
import StuffApiClient from "../service/stuff.api.client";
import PropTypes from "prop-types";

export default class DeleteStuffPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteStuff: undefined
    }
  }

  static get propTypes() {
    return {
      stuff : PropTypes.object
    }
  }

  async _submitDeleteSearch () {

    const deleteResults = await StuffApiClient.deleteStuffBy(JSON.parse(localStorage.getItem('jwt')), this.props.stuff._id)

    console.log('typeof', typeof deleteResults)

    console.log('deleteResults', deleteResults)


    console.log('this.props.stuff', this.props.deleteStuff)

    const stuffAfterDelete = Object.entries(deleteResults).filter(deleteResult => deleteResult.props)

    console.log('deleteResult', this.props._id)

    await this.setState({deleteResults: stuffAfterDelete})



    // if(deleteResults.stuff.stuff.length > 1) {
    //   await this.setState({allStuff: deleteResults.stuff.stuff})
    // } else {
    //   await this.setState({allStuff: undefined})
    // }
  }

  // async deleteChange(event) {
  //   const stuffAfterDelete = allStuff
  // }

  async _submit(event) {
    event.preventDefault()
    await this._submitDeleteSearch()
  }

render() {
    return (
        <div>
          <button
            type={"submit"}
            onClick={(event) =>
              this._submit(event)}>Delete
          </button>
        </div>
    )
}
}