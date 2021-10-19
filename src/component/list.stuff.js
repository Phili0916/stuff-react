import React from 'react'

export default class ListStuff extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      allStuff :undefined
    }
  }


  componentDidMount() {
    //TODO : get all stuff from your database

  }

  render() {

    return (
        this.state.allStuff=== undefined
            ? (<div>
                <p>No stuff found</p>
              </div>)
            :(<div>
          OK
          {/* TODO Display your stuff*/}
            </div>)

    )
  }

}