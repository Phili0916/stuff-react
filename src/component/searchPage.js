import React from 'react'
import StuffApiClient from "../service/stuff.api.client";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
    }

  }

  searchChange(event) {
    const search = event.target.value
        this.setState({search : search})
    console.log("###search");
    console.log(search)
  }

  async _submit(event) {
    event.preventDefault()
    const results = await StuffApiClient.getStuffBy(JSON.parse(localStorage.getItem('jwt')), this.state.search)
    console.log(results)
  }

  filteredTitles() {
    let filterTitles = results.filter((item) => {
      console.log(filterTitles)
      console.log(filterTitles)
      return item.title.toLowerCase().includes(this.state.search.toLowerCase())
    })
  }

  render() {
    const { search } = this.state

    return (
        <div className={"search__Page"}>
          <form className={"search__Form"}>
            <input
                className={"search__Form__input"}
                type="text"
                placeholder={"search by title"}
                value={search}
                onChange={(event) => this.searchChange(event)}
            />
            <button className={"search__Form__button"}
                    onClick={(event) =>
                        this._submit(event)}>Search
            </button>
          </form>
          <div>
            <ul onChange={()=>this.filteredTitles()}>
            </ul>
          </div>
        </div>
    )
  }
}