const axios = require('axios')

async function content(key, id) {
    const ep = 'https://mandrillapp.com/api/1.0/messages/content.json'
    const params = { key, id }
    const { data } = await axios.get(ep, { params })
    return {
        html: data.html
    }
}

module.exports = key => ({
    content: id => content(key, id)
})
