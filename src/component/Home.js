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
    console.log(this.props)
    return (
        <div>
          <h1>Here is your stuff</h1>
          {this.props.user && (
              <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>
          )}

          <p>{this.props.greet}</p>
          <button onClick={(event)=>this._logout(event)}>
            Logout
          </button>
        </div>
    )
  }
}
