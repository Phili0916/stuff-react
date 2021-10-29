class StuffApiClient {

  static async createPost(jwt, body) {
    console.log('body', body)
    console.log('jwt', jwt)

    const response = await fetch('http://localhost:9090/stuff/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': jwt
      },
      body: JSON.stringify(body)
    })
    console.log('postResponse', response)
  }

  static async getAllStuff(jwt) {

    console.log("###params")
    console.log(jwt);

    const response = await fetch('http://localhost:9090/stuff/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': jwt
      }
    })
    console.log("####response in stuff request")
    console.log(response)
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
   * @param {object} object
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


}



export default StuffApiClient













