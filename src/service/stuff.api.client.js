class StuffApiClient {

  static async createPost(jwt, body) {
    // console.log('body', body)
    // console.log('jwt', jwt)

    const response = await fetch('http://localhost:9090/stuff/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': jwt
      },
      body: JSON.stringify(body)
    })
    // console.log('postResponse', response)
    if (!response.ok) {
      throw await response.json()
    }
    return await response.json()
  }

  static async getAllStuff(jwt) {

    // console.log("###params")
    // console.log(jwt);

    const response = await fetch('http://localhost:9090/stuff/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': jwt
      }
    })
    // console.log("####response in stuff request")
    // console.log(response)
    // const something = await response.json()
    // console.log("###something");
    // console.log(something)
    // return something
    if (!response.ok) {
      throw await response.json()
    }
    return await response.json()
  }

  /**
   *
   * @param {string} jwt
   * @param {object} params
   * @returns {Promise<void>}
   */
  static async getStuffBy(jwt, params) {
    console.log("params", params)
    let url = new URL('http://localhost:9090/stuff/criterion/')

    for(const [key, value] of Object.entries(params)){
      url.searchParams.append(key, value)
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': jwt
      }
    })

    if (!response.ok) {
      throw await response.json()
    }

    return await response.json()
  }

  static async updateOneStuff(jwt, _id, body) {
    console.log('jwt', jwt)
    console.log('body', body)
    console.log('_id', _id)
    const updateStuffResponse =  await fetch('http://localhost:9090/stuff/' +_id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': jwt
      },

      body: JSON.stringify(body)
    })
    if(!updateStuffResponse.ok) {
      throw await updateStuffResponse.json()
    }
    return await updateStuffResponse.json()
  }

  static async deleteStuffBy(jwt, _id) {

    const deleteStuffResponse = await fetch('http://localhost:9090/stuff/' +_id,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': jwt
      }
    })

    console.log('deleteStuffResponse', deleteStuffResponse)

    if(!deleteStuffResponse.ok) {
      throw await deleteStuffResponse.json()
    }
    return await deleteStuffResponse.json()
  }

}



export default StuffApiClient













