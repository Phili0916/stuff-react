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
        <nav>
          <div className={"logo"}>
            <img src="https://backend.factoryz.fr/uploads/logo_factoryz_png_62c7984871.png" alt="logo factoryz png.png" />
          </div>
          <ul className={"navLinks"}>
            <li className={"link"} onClick={()=>this._navigate('/stuff')}>Navigate to Stuff Page</li>
            <li className={"link"} onClick={()=>this._navigate('/')}>Navigate to Home Page</li>
            <li className={"link"} onClick={()=>this._navigate('/user')}>Navigate to User Page</li>
          </ul>
        </nav>
    )
  }

}

export default withRouter(Navbar)
