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

    const data = await response.json()
    if (!data.userId) {
      console.log(data.message)
      return data
    } else {
      console.log('found data.userId')
      window.jwt = data.token
      data.message ='ok'
      console.log("###data");
      console.log(data)
      return data
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

    if(!response.ok){
      throw await response.json()
    }
    return await response.json()
  }
}

export default UserApiClient