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
    //console.log(this.props.stuff.stuff, 'stuff')
    return (
        <div className={"home"}>
          <main className={"main"}>
            <h2>{this.props.t('home.welcome')}</h2>
            {this.props.user && (
                <>
                  <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>
                  <SearchPage
                    stuff={this.props.stuff.stuff}
                  />
                </>
            )}
          </main>
        </div>
    )
  }
}

export default withTranslation()(Home)
