import React from 'react'
import PropTypes from "prop-types";
import {withTranslation} from 'react-i18next'
import withRouter from '../../helper/withRouter';

export class Navbar extends React.Component {

  constructor(props) {
    super(props);
  }

  static get propTypes() {
    return {
      t: PropTypes.func, // withTranslation
      onLogout : PropTypes.func,
      history: PropTypes.object, // withRouter.js
    }
  }

  _navigate(destination){
    this.props.navigate(destination)
  }

  async _logout(){
    await this.props.onLogout()
  }

  render(){
    return(
        <nav>
          <div className={"nav-logo"}>
            <img src="https://backend.factoryz.fr/uploads/logo_factoryz_png_62c7984871.png" alt="logo factoryz png.png" />
          </div>
          <ul className={"navLinks"}>
            <li className={"nav-link"} onClick={()=>this._navigate('/')}>{this.props.t('navbar.home')}</li>
            <li className={"nav-link"} onClick={()=>this._navigate('/addStuff')}>{this.props.t('navbar.add')}</li>
            <li className={"nav-link"} onClick={()=>this._navigate('/user')}>{this.props.t('navbar.user')}</li>
          </ul>
          <div className={"nav_home_buttons"} >
            <button className={"nav_home_logout_button"} onClick={(event)=>this._logout(event)}>
              {this.props.t('navbar.logout')}
            </button>
          </div>
        </nav>
    )
  }

}

export default withRouter(withTranslation()(Navbar))


