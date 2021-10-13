import React from 'react'


function Login_display(props) {
  console.log("####props");
  console.log(props)
    // console.log('this.state.username : ' + this.state.username)
    // console.log('this.state.password : ' + this.state.password)
    // TODO 1 : style
    return (
        <div className={"login"}>
          <h1>React Form</h1>
          <form className={"login__username"} onSubmit={props._submit}>
            <label>
              <input className={"login__username__input"}
                     type="text"
                     name="username"
                     value={props.data.username}
                     placeholder="User Name"
                     onChange={props.handleChange}
              />
            </label>
            <label>
              <input className={"login__username__input"}
                     type={"text"}
                     name="password"
                     value={props.data.password}
                     placeholder="Enter Password"
                     onChange={props.handleChange}
              />
            </label>
            <button>Submit</button>
          </form>
          {/*TODO 2 : when you change the input, the state is updated*/}
        </div>
    )
}
export default Login_display