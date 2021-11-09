import React from 'react'
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types'

export default class UpdateStuffPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    console.log(this.props.stuff)
  }

  static get propTypes() {
    return {
      stuff : PropTypes.object
    }
  }

  // async updateStuffSearch() {
  //   const updateResults =
  // }

  render() {
    return(
        <div>
          What do you want to update?
        </div>
    )
  }
}

