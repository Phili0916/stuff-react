import React from 'react'


export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  _logout(e){
    e.preventDefault()
    this.props.onLogout()
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
                </>
            )}

            <p>{this.props.greet}</p>
            <div className={"home_buttons"}>
              <button className={"home_logout_button"} onClick={(event)=>this._logout(event)}>
                Logout
              </button>
            </div>
          </main>
        </div>
    )
  }
}
