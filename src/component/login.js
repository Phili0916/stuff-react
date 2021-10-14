import React from 'react'

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    console.log(event.target.value)
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  }

  _submit(event) {
    event.preventDefault()
    // alert('Form was submitted')
    // TODO 3 : when you submit your form, you request your service in order to check if the username and password are correct

    // TODO 4 : If authentication succeed, use props onAuthenticationSuccess
    console.log(this)
    this.props.onAuthenticationSuccess('something')

  }
  render() {
    return (
      <div className={"login"}>
        <h1>React Form</h1>
        <form className={"login__username"} onSubmit={(event)=>this._submit(event)}>
          <label>
            <input className={"login__username__input"}
                   type="text"
                   name="username"
                   value={this.state.username}
                   placeholder="User Name"
                   onChange={this.handleChange}
            />
          </label>
          <label>
            <input className={"login__username__input"}
                   type={"text"}
                   name="password"
                   value={this.state.password}
                   placeholder="Enter Password"
                   onChange={this.handleChange}
            />
          </label>
          <button>Submit</button>
        </form>
        {/*TODO 2 : when you change the input, the state is updated*/}
      </div>
    )
  }

}

































