import React from "react";
import StuffApiClient from "../service/stuff.api.client";
import PropTypes from "prop-types";
import {withTranslation} from 'react-i18next'

export class DeleteStuffPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteStuff: undefined
    }
  }

  static get propTypes() {
    return {
      stuff : PropTypes.object,
      t: PropTypes.func //with Translation
    }
  }

  async _submitDeleteSearch () {

    const deleteResults = await StuffApiClient.deleteStuffBy(JSON.parse(localStorage.getItem('jwt')), this.props.stuff._id)

    const stuffAfterDelete = Object.entries(deleteResults).filter(deleteResult => deleteResult.props)

    await this.setState({deleteResults: stuffAfterDelete})

  }


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
              this._submit(event)}>{this.props.t("delete.page.button.delete")}
          </button>
        </div>
    )
}
}

export default (withTranslation()(DeleteStuffPage))