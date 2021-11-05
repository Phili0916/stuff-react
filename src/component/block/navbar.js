import React from 'react'
import {withRouter} from "react-router-dom";

export class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  _navigate(destination){
    this.props.history.push(destination)
    console.log('history', this.props.history)
  }

  _logout(e){
    e.preventDefault()
    this.props.onLogout()
  }


  render(){
    return(
        <nav>
          <div className={"logo"}>
            <img src="https://backend.factoryz.fr/uploads/logo_factoryz_png_62c7984871.png" alt="logo factoryz png.png" />
          </div>
          <ul className={"navLinks"}>
            <li className={"link"} onClick={()=>this._navigate('/')}>Home Page</li>
            {/*<li className={"link"} onClick={()=>this._navigate('/stuff')}>Stuff Page</li>*/}
            <li className={"link"} onClick={()=>this._navigate('/addStuff')}>Add Stuff Page</li>
            <li className={"link"} onClick={()=>this._navigate('/user')}>User Page</li>
          </ul>
          <div className={"home_buttons"} >
            <button className={"home_logout_button"} onClick={(event)=>this._logout(event)}>
              Logout
            </button>
          </div>
        </nav>
    )
  }

}

export default withRouter(Navbar)
