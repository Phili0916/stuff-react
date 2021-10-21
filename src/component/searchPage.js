import React from 'react'

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      setSearch: '',
    }
  }

  searchChange(event) {
    console.log(event.target.value)
    console.log(event.target)
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  async _submit (event) {
    event.preventDefault()
  }

  render() {
    return (
        <div className={"search__Page"}>
          <form className={"search__Form"}
                onSubmit={(event) =>
                    this._submit(event)}
          >
            <input
                className={"search__Form__input"}
                onChange={this.searchChange}
                type={"text"}
                placeholder={"search"}
                name="setSearch"
                value={this.state.setSearch}
            />
            <button className={"search__Form__button"}>Search</button>
          </form>
        </div>
    )
  }
}