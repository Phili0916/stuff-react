import React from 'react'
import {
  BrowserRouter,
  Route,
  Switch
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

import Login from "./component/login";
import Home from "./component/Home";
import ListStuff from "./component/list.stuff";
import CreateUser from "./component/createUser";
import Navbar from "./component/block/navbar";
import SearchPage from "./component/searchPage";
import CardStuff from "./component/card.stuff";
import AddStuffPage from "./component/addStuffPage";
import UpdateStuffPage from "./component/updateStuffPage";
import StuffApiClient from "./service/stuff.api.client";




export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      stuff: {}
    }
  }

  async _login(userId, jwt, user) {
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("jwt", JSON.stringify(jwt))
    if (user) {
      await this.setState({user: user})
    }
  }

  async _getStuff( stuff) {
    if (stuff) {
      await this.setState({stuff: stuff})
    }
  }

  async _logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('jwt')
    await this.setState({user: undefined})
  }

  async componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      await this.setState({user: user})
    }

    if (JSON.parse(localStorage.getItem('user'))) {
      await this.setState({user: user})
    }
    const stuff = await StuffApiClient.getAllStuff(JSON.parse(localStorage.getItem('jwt')))
    if(stuff) {
      await this.setState({'stuff': stuff})
    }
    if(JSON.parse(localStorage.getItem('stuff'))) {
      await this.setState({stuff: stuff})
      console.log('stuff', stuff)
    }
  }

  greet() {
    console.log("Hello")
  }


  render() {
    console.log('allStuff',this.state.stuff)
    return (
        <>
          {this.state.user !== undefined
              ? (
                  <BrowserRouter>
                    <Navbar
                        source={this.props?.history}
                        onLogout={() => this._logout()}
                    />

                    <Switch>
                      <Route exact path="/" component={() => <Home
                          greet={this.greet}
                          user={this.state.user}
                      />}/>

                      <Route path="/stuff" component={() => <ListStuff/>}/>
                      <Route path="/addStuff" component={() => <AddStuffPage/>}/>
                      <Route path="/user" exact={true} component={() => <CreateUser/>}/>
                      {/*<Route path="/deleteStuff" component={() => <DeleteStuffPage/>}/>*/}

                      <Route path="/updateStuff" component={() => <UpdateStuffPage allStuff={this.state.stuff} onChange={()=> this._getStuff()}/>}/>

                    </Switch>
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


