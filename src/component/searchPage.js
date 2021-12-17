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
import UserApiClient from "../service/user.api.client";
import PropTypes from "prop-types";
import {withTranslation} from 'react-i18next'

export class SearchPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      titleSearch: '',
      citySearch: '',
      categorySearch: undefined,
      allStuff: undefined,
      allUsers: [],
      error: false
    }
  }

  static get PropTypes() {
    return{
      t: PropTypes.func //with Translation
    }
  }

  async componentDidMount() {
    try {
      const allUsers = await UserApiClient.getAllUsers(JSON.parse(localStorage.getItem('jwt')))
      const params = {status: "1,2"}
      this.setState({allUsers: allUsers})
      await this._submitSearch(params)
    } catch (error) {
      console.error(error)
      this.setState({error: true})
    }
  }


  async _submitSearch(customParams) {
    const params = customParams || {}
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
    // console.log('results', results)
    if (results.stuff.stuff?.length >= 1) {
      await this.setState({allStuff: results.stuff.stuff})
    } else {
      await this.setState((prevState)=>{
        prevState.allStuff = undefined
      })
    }
  }

  async searchChange(event) {
    await this.setState({
      [event.target.name]: event.target.value
    })
  }


  async _submit(event) {
    event.preventDefault()
    await this._submitSearch()
  }

  render() {

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
                    placeholder={this.props.t('searchPage.titleSearch')}
                    value={titleSearch}
                    onChange={(event) => this.searchChange(event)}
                />
              </div>
              <div className={"form__input"}>
                <input
                    className={"form__input__textBox"}
                    type="text"
                    name="citySearch"
                    placeholder={this.props.t('searchPage.citySearch')}
                    value={citySearch}
                    onChange={(event) => this.searchChange(event)}
                />
              </div>
              <div className={"form__input"}>
                <select className={"form__category__select"} name="categorySearch" value={categorySearch}
                        onChange={(event) => this.searchChange(event)}>
                  <option value={undefined} selected={true}>--{this.props.t('searchPage.searchCategory.category')}--</option>
                  <option value={CATEGORY_MISCELLANEOUS}>{this.props.t('searchPage.searchCategory.miscellaneous')}</option>
                  <option value={CATEGORY_MOUSE}>{this.props.t('searchPage.searchCategory.mouse')}</option>
                  <option value={CATEGORY_MONITOR}>{this.props.t('searchPage.searchCategory.monitor')}</option>
                  <option value={CATEGORY_SCREEN}>{this.props.t('searchPage.searchCategory.screen')}</option>
                  <option value={CATEGORY_KEYBOARD}>{this.props.t('searchPage.searchCategory.keyboard')}</option>
                  <option value={CATEGORY_LAPTOP}>{this.props.t('searchPage.searchCategory.laptop')}</option>
                  <option value={CATEGORY_DESKTOP}>{this.props.t('searchPage.searchCategory.desktop')}</option>
                  <option value={CATEGORY_HEADPHONE}>{this.props.t('searchPage.searchCategory.headphones')}</option>
                  <option value={CATEGORY_MICROPHONE}>{this.props.t('searchPage.searchCategory.microphone')}</option>
                  <option value={CATEGORY_SPEAKERPHONE}>{this.props.t('searchPage.searchCategory.speakerphones')}</option>
                  <option value={CATEGORY_MOBILE}>{this.props.t('searchPage.searchCategory.mobile')}</option>
                  <option value={CATEGORY_TABLET}>{this.props.t('searchPage.searchCategory.tablets')}</option>
                </select>
              </div>
              {/*SEARCH BUTTON*/}
              <button className={"search__Form__button"}
                      onClick={(event) =>
                          this._submit(event)}>{this.props.t('searchPage.search')}
              </button>
            </form>
          </div>
          {this.state.allStuff === undefined
              ? (<div className={"stuff_home"}>

                <div>{this.props.t('searchPage.searchCriteria.notFound')}</div>
              </div>)
              : (

                  <div className={'searchPage__stuff__table__container'}>
                    <div>Number of stuff : {this.state.allStuff.length}</div>
                    <table className={'searchPage__stuff__table'}>
                      <thead className={"searchPage__stuff__table__head"}>
                      <th>{this.props.t('searchPage.searchCriteria.id')}</th>
                      <th>{this.props.t('searchPage.searchCriteria.title')}</th>
                      <th>{this.props.t('searchPage.searchCriteria.price')}</th>
                      <th>{this.props.t('searchPage.searchCriteria.category')}</th>
                      <th>{this.props.t('searchPage.searchCriteria.status')}</th>
                      <th>{this.props.t('searchPage.searchCriteria.description')}</th>
                      <th>{this.props.t('searchPage.searchCriteria.city')}</th>
                      <th>{this.props.t('searchPage.searchCriteria.update')}</th>
                      <th>{this.props.t('searchPage.searchCriteria.show')}</th>
                      <th>{this.props.t('searchPage.searchCriteria.delete')}</th>

                      </thead>
                      {
                        this.state.allStuff.map(oneOfMyStuff => {

                        return (
                            <CardStuff
                                stuff={oneOfMyStuff}
                                onDeleteItem={()=>this._submitSearch({status:"1,2"})}
                                users = {this.state.allUsers}
                            />
                        )
                      })}

                    </table>

                  </div>)}
        </div>
    )
  }
}

export default withTranslation()(SearchPage)
