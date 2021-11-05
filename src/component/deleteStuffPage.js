import React from "react";

export default class DeleteStuffPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteStuff: undefined
    }
  }
render() {
    return (
        <div>Would You like to Delete?</div>
    )
}
}