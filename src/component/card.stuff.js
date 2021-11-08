import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from "react-router-dom";
import SearchPage from "./searchPage";
import {
  CATEGORY_DESKTOP, CATEGORY_HEADPHONE,
  CATEGORY_KEYBOARD, CATEGORY_LAPTOP, CATEGORY_MICROPHONE,
  CATEGORY_MISCELLANEOUS, CATEGORY_MOBILE,
  CATEGORY_MONITOR,
  CATEGORY_MOUSE,
  CATEGORY_SCREEN, CATEGORY_SPEAKERPHONE, CATEGORY_TABLET
} from "../helper/constants";


import StuffApiClient from "../service/stuff.api.client";
import DeleteStuffPage from "../component/deleteStuffPage";


export class CardStuff extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: 'divers',
      confirmDelete: false,
      showHideButton: false
    }
  }

  static get propTypes() {
    return {
      stuff: PropTypes.object,
      onDeleteItem : PropTypes.func
    }
  }


  componentDidMount() {
    console.log(this.props)
    // 0 1 12

    switch (parseInt(this.props.category)) {
      case CATEGORY_MISCELLANEOUS :
        this.setState({category: 'Divers'})
        // console.log("##thisCard");
        // console.log(this)
        break
      case CATEGORY_MOUSE :
        this.setState({category: 'Mouse'})
        // console.log("##thisCard");
        // console.log(this)
        break
      case CATEGORY_MONITOR :
        this.setState({category: 'Monitor'})
        // console.log("##thisCard");
        // console.log(this)
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
        return
    }
  }

  _navigate(destination) {
    this.props.history.push(destination)
  }

  _update() {
    console.log('navigate to one stuff in order to update it')
  }

  async _deleteStuff() {
    this.setState({confirmDelete: true})
  }

  async _confirmDelete(id) {
    await StuffApiClient.deleteStuffBy(JSON.parse(localStorage.getItem('jwt')),id)
    this.setState({confirmDelete: false})
    this.setState({showHideButton: true})
    this.props.onDeleteItem()
  }

  hideButton() {
    if(this._deleteStuff() === true) {
      this.setState({showHideButton: true})

    }
  }

  render() {
    // console.log('deleteStuff', deleteStuffPage)
    return (
        <tr className={"searchPage__stuff__table__body"}>

          <td>
            {this.props.stuff._id}
          </td>
          <td>
            {this.props.stuff.title}
          </td>
          <td>
            {this.props.stuff.price}
          </td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
          <td onClick={() => this._navigate("/updateStuff")}>update</td>
          <td>show</td>
          {/*<td onClick={()=>this._navigate("/deleteStuff")}>delete</td>*/}
          <td onClick={() => this._deleteStuff()}>
            <>
              <button
                  type={"submit"}
                  onClick={(event) =>
                      this._deleteStuff(this.props.hideButton)}>Delete
              </button>
              {this.state.confirmDelete && (
                  <button
                      type={"submit"}
                      onClick={() => this._confirmDelete(this.props.stuff._id)}>confirm</button>
              )}
            </>

          </td>
          {/*<td>*/}
          {/*  <>*/}
          {/*    <DeleteStuffPage*/}
          {/*    stuff={this.props.stuff}/>*/}
          {/*  </>*/}


          {/*</td>*/}
        </tr>
    )
  }
}

export default withRouter(CardStuff)