import React from 'react'


export default class CardStuff extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      category: 'divers'
    }
  }

  componentDidMount() {
    switch (parseInt(this.props.stuff.category)) {
      case 1 :
        this.setState({category: 'Computer Mouse'})
        console.log("##thisCard");
        console.log(this)
        break
      case 0 :
        this.setState({category: 'MISCELLANEOUS'})
        console.log("##thisCard");
        console.log(this)
        break
      default :
        return
    }
  }

  render() {
    return (
        <div className={"card__stuff"}>
          <div className={"card__stuff__title"}>
            Title : <span className={"card__stuff__title__label"}>{this.props.stuff.title}</span>
          </div>

          <div className={"card__stuff__title"}>
            Category : <span className={"card__stuff__title__label"}>{this.props.stuff.category}</span>
          </div>

          <div className={"card__stuff__title"}>
            Description : <span className={"card__stuff__title__label"}>{this.props.stuff.description}</span>
          </div>

          <div className={"card__stuff__title"}>
            Price : <span className={"card__stuff__title__label"}>{this.props.stuff.price}</span>
          </div>

        </div>
    )
  }

}