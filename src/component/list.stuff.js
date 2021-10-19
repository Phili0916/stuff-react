import React from 'react'
import StuffApiClient from "../service/stuff.api.client";

export default class ListStuff extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      allStuff :undefined
    }
  }


  async componentDidMount() {
    //TODO : get all stuff from your database
    const allStuff = StuffApiClient.getAllStuff(this.state.allStuff)
    console.log("###allStuff");
    console.log(allStuff)
    if(allStuff) {
      await this.setState({'allStuff': allStuff})
    }
    if(JSON.parse(localStorage.getItem('allStuff'))) {
      await this.setState({allStuff: allStuff})
    }
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