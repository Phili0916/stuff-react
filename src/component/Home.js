import React from 'react'
import SearchPage from "./searchPage";


export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
        <div className={"home"}>
          <main className={"main"}>
            <h2>Welcome to Factoryz</h2>
            {this.props.user && (
                <>
                  <h2>Here is your stuff</h2>
                  <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>
                  <SearchPage />
                </>
            )}

            <p>{this.props.greet}</p>
          </main>
        </div>
    )
  }
}
