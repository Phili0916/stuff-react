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

  static async signup( body) {
    console.log('signup body', body)

    const userRegisterResponse =  await fetch('http://localhost:9090/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    console.log('userRegistrationResponse', userRegisterResponse)
    if (!userRegisterResponse.ok) {
      throw await userRegisterResponse.json()
    }
      return await userRegisterResponse.json()
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

  static async getAllUsers(token) {
    const getAllUsersResponse =  await fetch('http://localhost:9090/auth/getAllUsers/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
    })
    console.log('getAllUsersResponse', getAllUsersResponse)
    if(!getAllUsersResponse.ok){
      throw await getAllUsersResponse.json()
    }
    return await getAllUsersResponse.json()
  }
}

export default UserApiClient