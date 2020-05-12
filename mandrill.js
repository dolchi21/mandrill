const axios = require('axios')

async function content(key, id) {
    const ep = 'https://mandrillapp.com/api/1.0/messages/content.json'
    const params = { key, id }
    const { data } = await axios.get(ep, { params })
    const { html } = data
    return {
        html
    }
}
async function info(key, id) {
    const ep = 'https://mandrillapp.com/api/1.0/messages/info.json'
    const params = { key, id }
    const { data } = await axios.get(ep, { params })
    const { state } = data
    return {
        state
    }
}

module.exports = key => ({
    content: id => content(key, id),
    info: id => info(key, id),
})
