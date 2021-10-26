import React from 'react'
import StuffApiClient from "../service/stuff.api.client";
import CardStuff from "./card.stuff";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleSearch: '',
      citySearch: '',
      categorySearch: '',
      allStuff: undefined
    }
  }

  // async componentDidMount() {
    // await this._submitSearch()
  // }

  async _submitSearch() {
    const obj = {}
    // check if a title is set
    if(this.state.titleSearch !==''){
      obj.title = this.state.titleSearch
    }
    if(this.state.citySearch !== ''){
      obj.city = this.state.citySearch
    }
    if(this.state.categorySearch !== '') {
      obj.category = this.state.categorySearch
    }
    // modify obj (add params : obj.title = this.state.titleSearch

    // check if .... city this.State.citySearch === ''

    // check if .... category

    // check if zipcode


    const results = await StuffApiClient.getStuffBy(JSON.parse(localStorage.getItem('jwt')), obj )
    // console.log('results')
    // console.log(results)
    // console.log("Phil", results.stuff.stuff[0]?.title)
    //
    //
    // console.log("Phil2", results)
    // console.log("Phil3", Array.of(results))
    // console.log("search", this.state.titleSearch)
    if (results.stuff.stuff.length >= 1) {
      await this.setState({allStuff: results.stuff.stuff})
    } else {
      await this.setState({allStuff: undefined})
    }


    // return results.stuff

    // let filterTitles = Array.of(results).filter(result => {
    //   //
    //   console.log('result.stuff', result.stuff[0].title)
    //   return result.stuff[0].title.toLowerCase().indexOf(this.state.search?.toLowerCase()) !== -1
    // })
  }

  searchTitleChange(event) {
    const title = event.target.value
    this.setState({titleSearch: title})
    console.log("###title");
    console.log(title)

  }

  searchCityChange(event) {
    const city = event.target.value
    this.setState({citySearch: city})
    console.log('citySearch', city)
  }

  searchCategoryChange(event) {
    const category = event.target.value
    this.setState({categorySearch: category})
    console.log('categorySearch', category)
  }

  async _submit(event) {
    event.preventDefault()
    await this._submitSearch()
  }

  render() {
    console.log('this.state.allStuff')
    console.log(this.state.allStuff)
    const {titleSearch, citySearch, categorySearch} = this.state

    return (
        <div className={"search__Page"}>
          <form className={"search__Form"}>
            <input
                className={"search__Form__input"}
                type="text"
                placeholder={"search by title"}
                value={titleSearch}
                onChange={(event) => this.searchTitleChange(event)}
            />

            <input
                className={"search__Form__input"}
                type="text"
                placeholder={"search by city"}
                value={citySearch}
                onChange={(event) => this.searchCityChange(event)}
            />

            <input
                className={"search__Form__input"}
                type="text"
                placeholder={"search by category"}
                value={categorySearch}
                onChange={(event) => this.searchCategoryChange(event)}
            />
            {/*SEARCH BUTTON*/}
            <button className={"search__Form__button"}
                      onClick={(event) =>
                          this._submit(event)}>Search
            </button>

          </form>


          {this.state.allStuff === undefined
              ? (<div className={"stuff_home"}>

                <p>No stuff found</p>
              </div>)
              : (<div className={'stuff_home'}>
                <main className={'stuff_main'}>

                  {this.state.allStuff.map(stuff => (

                      <CardStuff
                          stuff={stuff}/>
                  ))
                  }
                </main>

              </div>)}
        </div>
    )
  }
}