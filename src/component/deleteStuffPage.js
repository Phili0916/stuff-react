import React from "react";
import StuffApiClient from "../service/stuff.api.client";

export default class DeleteStuffPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteTitle: undefined,
      deleteCity: undefined,
      deleteCategory: undefined,
      allStuff: undefined

    }
  }

  async _submitDeleteSearch () {
    const params = {}

    if(this.state.deleteTitle !== undefined) {
      params.title = this.state.deleteTitle
    }
    if(this.state.deleteCity !== undefined) {
      params.city = this.state.deleteCity
    }
    if(this.state.deleteCategory) {
      params.category = this.state.deleteCategory
    }

    const deleteResults = await StuffApiClient.deleteStuffBy(JSON.parse(localStorage.getItem('jwt')), params)
    console.log(deleteResults)
  }

render() {
    return (
        <div>Would You like to Delete?</div>
    )
}
}