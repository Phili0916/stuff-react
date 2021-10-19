import React from 'react'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div>
          <h1>Here is your stuff</h1>
          <h1>{this.props.user?.firstName}</h1>
          <p>{this.props.greet}</p>
        </div>
    )
  }
}
