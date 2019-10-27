const axios = require('axios').default
const qs = require('querystring')

class ThermostatdError extends Error {
  constructor(message) {
    super(message)
    this.name = "ThermostatdError"
  }
}

class ThermostatdClient {
  constructor(host, token) {
    this.host = host
    this.token = token
  }

  get headers() {
    return {
      "Authorization": `Bearer ${this.token}`
    }
  }

  async get(endpoint) {
    const { data } = await axios.get(`${this.host}${endpoint}`, {
      headers: this.headers
    })

    if(data.error) throw new ThermostatdError(data.error)
    return data
  }

  async patch(endpoint, patchData = { }) {
    const { data } = await axios.patch(`${this.host}${endpoint}`, qs.stringify(patchData), {
      headers: {
        ...this.headers,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })

    if(data.error) throw new ThermostatdError(data.error)
    return data
  }

  async getState() {
    return this.get("/v1/state")
  }

  async patchState(newState = { }) {
    return this.patch("/v1/state", newState)
  }
}

module.exports = {
  ThermostatdClient,
  ThermostatdError
}