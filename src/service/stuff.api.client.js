class StuffApiClient {

    static async getAllStuff(id, token) {

    const response = await fetch('http://localhost:9090/stuff/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    })
    console.log("####response in stuff request")
    console.log(response)
    if(!response.ok) {
      throw await response.json()
    }
    return await response.json()
  }
}

//window.location.origin

export default StuffApiClient













