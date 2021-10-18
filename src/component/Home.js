import React from 'react'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {

    return (
        <div>
          <h1>Here is your stuff{this.props.user}</h1>
        </div>
    )
  }
}