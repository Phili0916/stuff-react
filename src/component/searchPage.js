import React from 'react'
import StuffApiClient from "../service/stuff.api.client";
import CardStuff from "./card.stuff";
import {
  CATEGORY_DESKTOP, CATEGORY_HEADPHONE,
  CATEGORY_KEYBOARD, CATEGORY_LAPTOP, CATEGORY_MICROPHONE,
  CATEGORY_MISCELLANEOUS, CATEGORY_MOBILE,
  CATEGORY_MONITOR,
  CATEGORY_MOUSE,
  CATEGORY_SCREEN, CATEGORY_SPEAKERPHONE, CATEGORY_TABLET
} from "../helper/constants";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      titleSearch: '',
      citySearch: '',
      categorySearch: undefined,
      allStuff: undefined
    }
  }

  // async componentDidMount() {
  // await this._submitSearch()
  // }

  async _submitSearch() {
    const params = {}
    // check if a title is set
    if (this.state.titleSearch !== '') {
      params.title = this.state.titleSearch
    }
    if (this.state.citySearch !== '') {
      params.city = this.state.citySearch
    }
    if (this.state.categorySearch !== undefined) {
      params.category = this.state.categorySearch
    }


    const results = await StuffApiClient.getStuffBy(JSON.parse(localStorage.getItem('jwt')), params)
      console.log()
    if (results.stuff.stuff.length >= 1) {
      await this.setState({allStuff: results.stuff})
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

  async searchChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state.categorySearch)
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
    // console.log('this.state.allStuff')
    // console.log(this.state.allStuff)
    // console.log('titleSearch', this.state.titleSearch)
    // console.log("citySearch", this.state.citySearch)
    const {titleSearch, citySearch, categorySearch} = this.state

    return (
        <div className={"form__container"}>
          <div className={"form__block"}>
            <h2 className={"form__title"}>Search for your Stuff</h2>
            <form>
              <div className={"form__input"}>
                <input
                    className={"form__input__textBox"}
                    type="text"
                    name="titleSearch"
                    placeholder={"search by title"}
                    value={titleSearch}
                    onChange={(event) => this.searchChange(event)}
                />
              </div>
              <div className={"form__input"}>
                <input
                    className={"form__input__textBox"}
                    type="text"
                    name="citySearch"
                    placeholder={"search by city"}
                    value={citySearch}
                    onChange={(event) => this.searchChange(event)}
                />
               </div>
               <div className={"form__input"}>
                  <select className={"form__category__select"} name="categorySearch" value={categorySearch}>
                        onChange={(event) => this.searchChange(event)}>
                  <option value={undefined} selected={true}>--Category--</option>
                  <option value={CATEGORY_MISCELLANEOUS} >Miscellaneous</option>
                  <option value={CATEGORY_MOUSE}>Mouse</option>
                  <option value={CATEGORY_MONITOR}>Monitor</option>
                  <option value={CATEGORY_SCREEN}>Screen</option>
                  <option value={CATEGORY_KEYBOARD}>Keyboard</option>
                  <option value={CATEGORY_LAPTOP}>Laptop</option>
                  <option value={CATEGORY_DESKTOP}>Desktop</option>
                  <option value={CATEGORY_HEADPHONE}>Headphones</option>
                  <option value={CATEGORY_MICROPHONE}>Microphone</option>
                  <option value={CATEGORY_SPEAKERPHONE}>Speakerphones</option>
                  <option value={CATEGORY_MOBILE}>Mobile</option>
                  <option value={CATEGORY_TABLET}>Tablets</option>
                </select>
               </div>
              {/*SEARCH BUTTON*/}
              <button className={"search__Form__button"}
                      onClick={(event) =>
                          this._submit(event)}>Search
              </button>
          </form>
        </div>
          {this.state.allStuff === undefined
              ? (<div className={"stuff_home"}>

                <p>No stuff found</p>
              </div>)
              : (<div className={'stuff_home'}>
                <main className={'stuff_main'}>

                        <CardStuff />
                    {/*)*/}
                  })}

                </main>

              </div>)}
        </div>
    )
  }
}