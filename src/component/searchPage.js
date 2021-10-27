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

    const results = await StuffApiClient.getStuffBy(JSON.parse(localStorage.getItem('jwt')), obj )
    // console.log('results')
    // console.log(results)
    // console.log("Phil", results.stuff.stuff[0]?.title)
    //
    console.log("titleProp", this.state)
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

  searchChange(event) {
    const value = event.target.value
    this.setState({
      [event.target.name]: value
    })
    }


  // searchCityChange(event) {
  //   const city = event.target.value
  //   this.setState({citySearch: city})
  //   console.log('citySearch', city)
  // }
  //
  // searchCategoryChange(event) {
  //   const category = event.target.value
  //   this.setState({categorySearch: category})
  //   console.log('categorySearch', category)
  // }

  async _submit(event) {
    event.preventDefault()
    await this._submitSearch()
  }

  render() {
    console.log('this.state.allStuff')
    console.log(this.state.allStuff)
    console.log('titleSearch', this.state.titleSearch)
    const {titleSearch, citySearch, categorySearch} = this.state

    return (
        <div className={"search__Page"}>
          <form className={"search__Form"}>
            <input
                className={"search__Form__input"}
                type="text"
                name="titleSearch"
                placeholder={"search by title"}
                value={titleSearch}
                onChange={(event) => this.searchChange(event)}
            />

            <input
                className={"search__Form__input"}
                type="text"
                name="citySearch"
                placeholder={"search by city"}
                value={citySearch}
                onChange={(event) => this.searchChange(event)}
            />

            <input
                className={"search__Form__input"}
                type="text"
                name="categorySearch"
                placeholder={"search by category"}
                value={categorySearch}
                onChange={(event) => this.searchChange(event)}
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

                  {this.state.allStuff.filter(value => {
                      if(this.searchChange === '') {
                        return value
                      } else if(this.state.titleSearch.toLowerCase().includes(titleSearch.toLowerCase())
                              || this.state.citySearch.toLowerCase().includes(citySearch.toLowerCase())
                              || this.state.categorySearch.toLowerCase().includes(categorySearch.toLowerCase())
                      ) {
                        return value
                      }
                  }).map(stuff => (

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