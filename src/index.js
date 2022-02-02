import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
  Route, Routes
} from "react-router-dom";
import './styles/login.scss'
import './styles/App.scss'
import './styles/navbar.scss'
import './styles/home.scss'
import './styles/listStuff.scss'
import './styles/cardStuff.scss'
import './styles/searchPage.scss'
import './styles/addStuffPage.scss'
import './styles/user.scss'
import './styles/updateStuff.scss'

import Login from "./component/login";
import Home from "./component/Home";
import ListStuff from "./component/list.stuff";
import CreateUser from "./component/createUser";
import Navbar from "./component/block/navbar";
import AddStuffPage from "./component/addStuffPage";
import UpdateStuffPage from "./component/updateStuffPage";
import StuffApiClient from "./service/stuff.api.client";


import {registerLocale} from "react-datepicker";
import i18n from "i18next";
import {I18nextProvider, initReactI18next} from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import fr from 'date-fns/locale/fr';


/**Register Date PICKER **/

registerLocale('fr', fr);

i18n.use(HttpApi).use(initReactI18next).init({
  lng: 'en',
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  debug: process.env.NODE_ENV !== 'production',
  react: {
    useSuspense: false,
  },

})

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      stuff: {},
      error: true
    }
  }

  async _login(userId, jwt, user) {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("jwt", JSON.stringify(jwt))
    if (user) {
      await this.setState({user: user})
    }
  }


  async componentDidMount() {
    try {
      const user = JSON.parse(localStorage.getItem('user'))

      if (user) {
        await this.setState({user: user})
      }

      if (JSON.parse(localStorage.getItem('user'))) {
        await this.setState({user: user})
      }
      const stuff = await StuffApiClient.getAllStuff(JSON.parse(localStorage.getItem('jwt')))
      if (stuff) {
        await this.setState({stuff: stuff})
      }
      if (JSON.parse(localStorage.getItem('stuff'))) {
        await this.setState({stuff: stuff})
      }
    } catch (error) {
      console.error(error)
      this.setState({error: true})
    }
  }

  async _logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('jwt')
    await this.setState({user: undefined})
  }


  render() {
    return (
        <>

          {this.state.user !== undefined
              ? (
                  <BrowserRouter>
                    <Navbar
                        source={this.props?.history}
                        onLogout={() => this._logout()}
                    />
                    <Routes>
                      <Route exact path="/"
                             element={<Home
                                 stuff={this.state.stuff}
                                 user={this.state.user}
                                 greet={this.greet}
                             />}
                      />

                      <Route path="/stuff" element={<ListStuff/>}/>
                      <Route path="/addStuff" element={<AddStuffPage/>}/>
                      <Route path="/user" exact={true} element={<CreateUser/>}/>
                      {/*<Route path="/deleteStuff" component={() => <DeleteStuffPage/>}/>*/}

                      <Route path={"/updateStuff/:id"}
                             element={<UpdateStuffPage
                             stuff={this.state.stuff} />}/>
                    </Routes>
                  </BrowserRouter>

              )
              :
              (<div className="App">
                <Login
                    onAuthenticationSuccess={async (userId, jwt, user) => await this._login(userId, jwt, user)}/>
              </div>)

          }
        </>
    )
  }
}


ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <App/>
    </I18nextProvider>,
    document.getElementById('root')
);

