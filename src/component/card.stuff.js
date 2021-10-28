import React from 'react'
import PropTypes from 'prop-types'


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
    switch (parseInt(this.props.stuff.category)) {
      case 0 :
        this.setState({category: 'Divers'})
        // console.log("##thisCard");
        // console.log(this)
        break
      case 1 :
        this.setState({category: 'Mouse'})
        // console.log("##thisCard");
        // console.log(this)
        break
      case 2 :
        this.setState({category: 'Monitor'})
        // console.log("##thisCard");
        // console.log(this)
        break
      case 3 :
        this.setState({category: 'Screen'})
        break
      case 4 :
        this.setState({category: 'keyboard'})
        break
      case 5 :
        this.setState({category: 'laptop'})
        break
      case 6 :
        this.setState({category: 'Desktop'})
        break
      case 7 :
        this.setState({category: 'Headphones'})
        break
      case 8 :
        this.setState({category: 'Microphone'})
        break
      case 9 :
        this.setState({category: 'speakerphone'})
        break
      case 10 :
        this.setState({category: 'mobile'})
        break
      case 11 :
        this.setState({category: 'tablet'})
        break
      default :
        return
    }
  }

  render() {
    console.log("this.props", this.props.stuff?.title)
    return (
        <div className={"card__stuff"}>
          <div className={"card__stuff__title"}>
            Title : <span className={"card__stuff__title__label"}>{this.props.stuff.title}</span>

          </div>

          <div className={"card__stuff__title"}>
            Category : <span className={"card__stuff__title__label"}>{this.state.category}</span>
          </div>

          <div className={"card__stuff__title"}>
            Description : <span className={"card__stuff__title__label"}>{this.props.stuff.description}</span>
          </div>

          <div className={"card__stuff__title"}>
            Price : <span className={"card__stuff__title__label"}>{this.props.stuff.price}</span>
          </div>

          <div className={"card__stuff__title"} >

          </div>

        </div>
    )
  }

}