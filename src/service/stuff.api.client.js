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
   * @param {string} title
   * @returns {Promise<void>}
   */
  static async getStuffBy(jwt, title) {
    console.log(jwt)
    console.log(title)

    const response = await fetch('http://localhost:9090/stuff/criterion/?title=' + title, {
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
    return await response.json()
  }
}
// window.location.origin

export default StuffApiClient













