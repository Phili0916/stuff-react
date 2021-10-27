class StuffApiClient {

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
  static async getStuffBy(jwt, object) {
    console.log('object', object)

    let url = new URL('http://localhost:9090/stuff/criterion/')

    for(const [key, value] of Object.entries(object)){
      console.log('!!! key value', object)
      url.searchParams.append('title', '' )
      url.searchParams.append('city', '')
      url.searchParams.append('category', '')
      console.log('key value of searchParams', key, value)
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': jwt
      }
    })
    console.log("###getStuffBySearch");
    console.log(response);
    if (!response.ok) {
      throw await response.json()
    }
    // console.log(response.json)
    return await response.json()
  }
}
// window.location.origin

export default StuffApiClient













