import React from "react";

export default class AddStuffPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
        <div className={"form__container"}>
          <div className={"form__block"}>
            <h2 className={"form__title"}>Add Stuff</h2>
            <form>
              <div className={"form__input"}>
                <input />
              </div>
              <div className={"form__input"}>
                <input />
              </div>
              <div className={"form__input"}>
                <input />
              </div>
              <div className={"form__button"}>
                <button type={"submit"}>Add Stuff</button>
              </div>
            </form>
          </div>
        </div>
    )
  }
}