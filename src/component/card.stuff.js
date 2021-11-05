import React from 'react'
import PropTypes from 'prop-types'
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


export default class CardStuff extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: 'divers'
    }
  }

  static get propTypes() {
    return {
      stuff : PropTypes.object
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

  _update(){
    console.log('navigate to one stuff in order to update it')
  }


  render() {
    return (
        <tr>
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
          <td onClick={()=>this._update()}>update</td>
          <td>show</td>
          <td>delete</td>
        </tr>
        // <div className={"card__stuff"}>
        //   <div className={"card__stuff__title"}>
        //     Title : <span className={"card__stuff__title__label"}>{this.props.stuff.title}</span>
        //
        //   </div>
        //
        //   <div className={"card__stuff__title"}>
        //     Category : <span className={"card__stuff__title__label"}>{this.state.category}</span>
        //   </div>
        //
        //   <div className={"card__stuff__title"}>
        //     Description : <span className={"card__stuff__title__label"}>{this.props.stuff.description}</span>
        //   </div>
        //
        //   <div className={"card__stuff__title"}>
        //     Price : <span className={"card__stuff__title__label"}>{this.props.stuff.price}</span>
        //   </div>
        //
        //   <div className={"card__stuff__title"} >
        //
        //   </div>
        //
        // </div>
        // <div className={"card__stuff"}>
        //   <h2 className={"card__stuff__title"}></h2>
        //   <table className={"card__stuff__table"}>
        //    <thead>
        //     <tr>
        //       <th></th>
        //       <th>Category</th>
        //       <th>Description</th>
        //       <th>Price</th>
        //     </tr>
        //    </thead>
        //     <tbody>
        //     {/*{this.state.allStuff.map((oneOfMyStuff) => (*/}
        //       <tr>
        //         <td>rdtft</td>
        //         <td></td>
        //         <td></td>
        //         <td></td>
        //       </tr>
        //     {/*))}*/}
        //
        //     </tbody>
        //   </table>
        // </div>
    )
  }

}