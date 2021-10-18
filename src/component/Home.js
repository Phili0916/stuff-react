import React from 'react'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  changeUser(props) {
    this.props.changeUser(this.state.user)

    console.log("###this.props");
    console.log(this.props)
  }


  render() {

    return (
        <div>
          <h1>Here is your stuff{this.changeUser.bind(this)}</h1>
          <h1>{this.props.user}</h1>
          <p>{this.props.greet}</p>
        </div>
    )
  }
}