import React from 'react'

import {
  CATEGORY_DESKTOP, CATEGORY_HEADPHONE,
  CATEGORY_KEYBOARD, CATEGORY_LAPTOP, CATEGORY_MICROPHONE,
  CATEGORY_MISCELLANEOUS, CATEGORY_MOBILE,
  CATEGORY_MONITOR,
  CATEGORY_MOUSE,
  CATEGORY_SCREEN, CATEGORY_SPEAKERPHONE, CATEGORY_TABLET, STATUS_BROKEN, STATUS_LOST, STATUS_NEW, STATUS_USED
} from "../helper/constants";

import StuffApiClient from "../service/stuff.api.client";
import UserApiClient from "../service/user.api.client";
import PropTypes from "prop-types";
import {withTranslation} from 'react-i18next'
import withRouter from "../helper/withRouter";


export class CardStuff extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: 'Divers',
      status: 'New Status',
      confirmDelete: false,
      showDeleteButton: true,
      notDelete: false,
    }

  }


  static get propTypes() {
    return {
      stuff: PropTypes.object,
      onDeleteItem: PropTypes.func,
      history: PropTypes.object, // withRouter.js
      t: PropTypes.func //with Translation
    }
  }


  async componentDidMount() {
    const user = await UserApiClient.getUser(this.props.stuff.ownerId, JSON.parse(localStorage.getItem('jwt')))
    this.setState({user: user.user})

    switch (parseInt(this.props.stuff.category)) {
      case CATEGORY_MISCELLANEOUS :
        this.setState({category: 'Divers'})
        break
      case CATEGORY_MOUSE :
        this.setState({category: 'Mouse'})
        break
      case CATEGORY_MONITOR :
        this.setState({category: 'Monitor'})
        break
      case CATEGORY_SCREEN :
        this.setState({category: 'Screen'})
        break
      case CATEGORY_KEYBOARD :
        this.setState({category: 'keyboard'})
        break
      case CATEGORY_LAPTOP :
        this.setState({category: 'laptop'})
        break
      case CATEGORY_DESKTOP :
        this.setState({category: 'Desktop'})
        break
      case CATEGORY_HEADPHONE :
        this.setState({category: 'Headphones'})
        break
      case CATEGORY_MICROPHONE :
        this.setState({category: 'Microphone'})
        break
      case CATEGORY_SPEAKERPHONE :
        this.setState({category: 'speakerphone'})
        break
      case CATEGORY_MOBILE :
        this.setState({category: 'mobile'})
        break
      case CATEGORY_TABLET :
        this.setState({category: 'tablet'})
        break
      default :
        this.setState({category: 'other'})
    }
    switch (parseInt(this.props.stuff.status)) {
      case STATUS_NEW  :
        this.setState({status: 'New Status'})
        break
      case STATUS_USED :
        this.setState({status: 'Old Status'})
        break
      case STATUS_LOST :
        this.setState({status: 'Lost Status'})
        break
      case STATUS_BROKEN :
        this.setState({status: 'Broken Status'})
        break
      default :
        this.setState({status: 'New Status'})
    }
  }

  _navigate(destination) {
    this.props.navigate(destination)
    const stuff = this.props.stuff
    return stuff
  }

  async _deleteStuff() {
    this.setState((prevState) => {
      prevState.showDeleteButton = false
      prevState.confirmDelete = true
      prevState.notDelete = true
      return prevState
    })
  }

  async _confirmDelete(id) {
    await StuffApiClient.deleteStuffBy(JSON.parse(localStorage.getItem('jwt')), id)
    this.setState({confirmDelete: true})
    this.setState({notDelete: true})
    await this._deleteStuff()
    this.props.onDeleteItem()
    this.setState((prevState) => {
      prevState.confirmDelete = false
      prevState.notDelete = false
      prevState.showDeleteButton = true
      return prevState
    })
  }

  async _confirmDeleteResponse() {
    await this._deleteStuff()
    this.props.onDeleteItem()
    this.setState((prevState) => {
      prevState.confirmDelete = false
      prevState.notDelete = false
      prevState.showDeleteButton = true
      return prevState
    })
  }

  render() {
    return (
        <tr className={"searchPage__stuff__table__body"}>
          <td>
            {this.state.user?.firstName}
          </td>
          <td>
            {this.props.stuff.title}
          </td>
          <td>
            {this.props.stuff.price}
          </td>
          <td>
            {this.state.category}
          </td>
          <td>
            {this.props.stuff.status}
          </td>
          <td>
            {this.props.stuff.description}
          </td>
          <td>
            {this.props.stuff.localisation?.city ? this.props.stuff.localisation?.city : 'MIAMI'}
          </td>
          <td>
            <button
                type={"submit"}
                onClick={() => this._navigate("/updateStuff/" + this.props.stuff._id)}
            >
              Update
            </button>
          </td>
          <td>show</td>
          <td>
            <>
              {this.state.showDeleteButton ?
                  <button
                      type={"submit"}
                      onClick={(event) =>
                          this._deleteStuff(this._deleteStuff)}>
                      {this.props.t("card-stuff.delete")}
                  </button> : null}
              {this.state.confirmDelete ?
                  <div className={"card__stuff__table__confirmDelete__container"}>
                    <button
                        type={"submit"}
                        onClick={() => this._confirmDelete(this.props.stuff._id)}>confirm
                    </button>
                    <p>Are you sure you want to delete?</p>
                    <button
                        type={"submit"}
                        onClick={() => this._confirmDeleteResponse(this._confirmDeleteResponse)}>No
                    </button>
                  </div> : null}
            </>
          </td>
        </tr>
    )
  }
}

export default withRouter(withTranslation()(CardStuff))