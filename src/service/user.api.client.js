class UserApiClient {

  // firstFunction() {
  //   console.log('ok')
  // }

  static async checkIfUsernameAndPasswordAreOK(username, pwd) {
    console.log('in userApiClient')
    console.log(username, pwd)

    const response = await fetch(`http://localhost:9090/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username,
        password: pwd
      })
    })

    const userdata = await response.json()
    if (!userdata.userId) {
      console.log(userdata.message)
      return userdata
    } else {
      console.log('found data.userId')
      window.jwt = userdata.token
      userdata.message ='ok'
      // console.log("###typeof data");
      // console.log(typeof 'userdata')
      return userdata
    }

  }

   static async getUser(userId, token) {
    const response = await fetch(`http://localhost:9090/auth/getUser/?id=`+userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
    })
     // console.log("###responseUser")
     // console.log(typeof 'response');

     if(!response.ok){
      throw await response.json()
    }
    return await response.json()
  }
}

export default UserApiClient