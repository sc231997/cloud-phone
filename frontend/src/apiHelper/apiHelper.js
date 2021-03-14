const axios = require('axios');

const baseUrl = 'http://localhost:5000'

var call = async (name, from, to, timelimit) => {
    return await axios.post(`${baseUrl}/call`, {
        from,
        to,
        name,
        timelimit
    })
}

var hangup = async (requestUuid) => {
    await axios.post(`${baseUrl}/hangup`, {
        requestUuid
    })
}

export default { call, hangup }