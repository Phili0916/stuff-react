import React from 'react'
import UserApiClient from "../service/user.api.client";

export default class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userdata: undefined
    }
  }

  async componentDidMount() {
    //TODO : get user from your database
    const user= JSON.parse(localStorage.getItem('user'))
    const userdata = await UserApiClient.getUser(user._id, JSON.parse(localStorage.getItem('jwt')))
    console.log("###typeof userdata");
    console.log(typeof 'userdata');
  }
  render() {
    return (
        <div>
          <p>This is user list page</p>
        </div>
    )
  }

}