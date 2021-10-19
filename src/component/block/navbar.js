import React from 'react'
import {withRouter} from "react-router-dom";

export class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  _navigate(destination){
    this.props.history.push(destination)
  }



  render(){
    return(
        <div>
          <ul>
            <li onClick={()=>this._navigate('/stuff')}>Navigate to Stuff Page</li>
            <li onClick={()=>this._navigate('/')}>Navigate to Home Page</li>
            <li onClick={()=>this._navigate('/user')}>Navigate to User Page</li>
          </ul>
        </div>
    )
  }

}

export default withRouter(Navbar)
