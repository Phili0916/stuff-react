import React from 'react'

export default class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      username:'',
      password:''
    }
this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  _submit(event){
    event.preventDefault()
    alert('Form was submitted')
    // TODO 3 : when you submit your form, you request your service in order to check if the username and password are correct
  }

  render() {
    // console.log('this.state.username : ' + this.state.username)
    // console.log('this.state.password : ' + this.state.password)
    // TODO 1 : style
    return (
        <div className={"login"}>
          <form className={"login__username"} onSubmit={this._submit}>
            <input className={"login__username__input"}
              type="text"
                   name="username"
                   value={this.state.username}
                   placeholder="User Name"
                   onChange={this.handleChange}
            />
            <input className={"login__username__input"}
              type={"text"}
                   name="password"
                   value={this.state.password}
                   placeholder="Enter Password"
                   onChange={this.handleChange}
            />
            <button>Submit</button>
          </form>
            {/*TODO 2 : when you change the input, the state is updated*/}

          {/*<div className={"login__password"}>*/}
          {/*  /!*TODO 2 : when you change the input, the state is updated*!/*/}
          {/*  <input type={"password"}*/}
          {/*         name={"login-password"}*/}
          {/*         placeholder={"put your password"}/>*/}
          {/*</div>*/}
          {/*/!*<div className={"login__submitButton"}>*!/*/}
          {/*/!*  <input type="submit" value ="Se connecter" name="login-submit"*!/*/}
          {/*/!*  onClick={()=>this._submit()}/>*!/*/}
          {/*</div>*/}
        </div>
    )
  }
}


