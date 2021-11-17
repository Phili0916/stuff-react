import React from 'react'
import PropTypes, {object} from 'prop-types'
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
// import {updateOneStuff} from "../../../device/Controllers/stuff_controller";
import {withRouter} from "react-router-dom";
import {
  CATEGORY_DESKTOP, CATEGORY_HEADPHONE,
  CATEGORY_KEYBOARD, CATEGORY_LAPTOP, CATEGORY_MICROPHONE,
  CATEGORY_MISCELLANEOUS, CATEGORY_MOBILE,
  CATEGORY_MONITOR,
  CATEGORY_MOUSE,
  CATEGORY_SCREEN, CATEGORY_SPEAKERPHONE, CATEGORY_TABLET
} from "../helper/constants";

import StuffApiClient from "../service/stuff.api.client";
import UserApiClient from "../service/user.api.client";


export class CardStuff extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: 'divers',
      confirmDelete: false,
      showDeleteButton: true,
      notDelete: false,
      users: {}
    }
    // console.log('this.props.stuff.localisation', this.props.stuff.localisation?.city)
  }


  static get propTypes() {
    return {
      stuff: PropTypes.object,
      onDeleteItem : PropTypes.func
    }
  }


  async componentDidMount() {
    const user= await UserApiClient.getUser(this.props.stuff.ownerId, JSON.parse(localStorage.getItem('jwt')))
    // console.log(user, 'USERRRRRRRRS')
    this.setState({user: user.user})

    switch (parseInt(this.props.category)) {
      case CATEGORY_MISCELLANEOUS :
        this.setState({category: 'Divers'})
        // console.log("##thisCard");
        // console.log(this)
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
        return
    }
  }

  // async _getUser(event) {
  //   const allUsers = await UserApiClient.getAllUsers(JSON.parse(localStorage.getItem('jwt')))
  //   this.setState({users: allUsers.users})
  //   this.state.users.map(user => {
  //     user = {user}
  //     console.log('user', user)
  //     return user
  //   })
  // }

  _navigate(destination) {
    this.props.history.push(destination)
    const stuff = this.props.stuff
    return stuff
  }


  async _deleteStuff() {
    this.setState({showDeleteButton: false})
    this.setState({confirmDelete: true})
    this.setState({notDelete: true})
  }


  async _confirmDelete(id) {
    await StuffApiClient.deleteStuffBy(JSON.parse(localStorage.getItem('jwt')),id)
    this.setState({confirmDelete: true})
    this.setState({notDelete: true})
    await this._deleteStuff()
    this.props.onDeleteItem()
    this.setState((prevState)=> {
      prevState.confirmDelete = false
      prevState.notDelete = false
      prevState.showDeleteButton = true
      return prevState
    })
  }

  async _confirmDeleteResponse() {
    await this._deleteStuff()
    this.props.onDeleteItem()
    this.setState((prevState)=> {
      prevState.confirmDelete = false
      prevState.notDelete = false
      prevState.showDeleteButton = true
      return prevState
    })
  }

  render() {
    const users = this.state
    const user = this.state
    // console.log('user', this.state.user?.firstName)
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
            {this.props.stuff.category}
          </td>
          <td>
            {this.props.stuff.status}
          </td>
          <td>
            {this.props.stuff.description}
          </td>
          <td>
            {this.props.stuff.localisation?.city ? this.props.stuff.localisation?.city: 'MIAMI'}
          </td>
          <td>
              <BrowserRouter>
                <button
                    type={"submit"}
                    onClick={() => this._navigate("/updateStuff/" + this.props.stuff._id)}
                    // render={(props) => <UpdateStuffPage {...props} stuff={this.props.stuff}/>}
                >
                  Update
                </button>
              </BrowserRouter>
          </td>
          <td>show</td>
          <td>
            <>
              {this.state.showDeleteButton ?
              <button
                  type={"submit"}
                  onClick={(event) =>
                      this._deleteStuff(this._deleteStuff)}>Delete
              </button> : null }
              {this.state.confirmDelete ?
                  <div className={"searchPage__stuff__table__confirmDelete__container"}>
                      <button
                          type={"submit"}
                          onClick={() => this._confirmDelete(this.props.stuff._id)}>confirm
                      </button>
                      <p>Are you sure you want to delete?</p>
                      <button
                          type={"submit"}
                          onClick={()=> this._confirmDeleteResponse(this._confirmDeleteResponse)}>No
                      </button>
                  </div> : null}
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
