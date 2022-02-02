import React from 'react'
import {withTranslation} from 'react-i18next'
import PropTypes from 'prop-types'
import SearchPage from "./searchPage";
import AppContext from "../context/app.context";



export class Home extends React.Component {
  static contextType = AppContext
  constructor(props) {
    super(props)
  }

  static get propTypes() {
    return {
      t: PropTypes.func, // withTranslation
    }
  }


  render() {
    return (
        <div className={"home"}>
          <div className={"home-main"}>
            <div className={"home-title"}>{this.props.t('home.welcome')}</div>
            {this.props.user && (
                <>
                  <div className={"home-name"}>{this.props.user.firstName} {this.props.user.lastName}</div>
                  <SearchPage
                    stuff={this.props.stuff.stuff}
                  />
                </>
            )}
          </div>
        </div>
    )
  }
}

export default withTranslation()(Home)
