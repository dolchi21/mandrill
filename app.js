const express = require('express')
const Mandrill = require('./mandrill')
const mandrill = Mandrill(process.env.API_KEY)

const app = express()

app.get('/message/:id/content', (req, res, next) => {
    try {
        const {id} = req.params
        const content = await mandrill.content(id)
        res.send(content.html)
    } catch (err) {
        next(err)
    }
})

app.listen(3000)
