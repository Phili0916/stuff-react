import React from 'react'
import StuffApiClient from "../service/stuff.api.client";

export default class ListStuff extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      allStuff : undefined
    }
  }

  async componentDidMount() {
    //TODO : get all stuff from your database
    const allStuff = await StuffApiClient.getAllStuff(JSON.parse(localStorage.getItem('jwt')))
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
    console.log("###this.state.allStuff");
    console.log(this.state.allStuff)
    return (
        this.state.allStuff === undefined
            ? (<div className={"stuff_home"}>

                <p>No stuff found</p>
              </div>)
            :(<div className={'stuff_home'}>
                <main className={'stuff_main'}>
                  <table>
                    <tr>
                      <th>Title</th>
                      <th>type</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </table>

                  {this.state.allStuff.stuff.map(stuff => (

                      <table>
                        <tr>
                          <td>{stuff.title}</td>
                          <td>{stuff.type}</td>
                          <td>{stuff.description}</td>
                          <td>{stuff.price}</td>
                        </tr>
                      </table>
                  ))
                  }
                </main>

            </div>)

    )
  }

}