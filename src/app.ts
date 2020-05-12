import * as express from 'express'
import { Mandrill } from './mandrill'

const mandrill = Mandrill(process.env.API_KEY)

const app = express()

app.get('/message/:id/info', async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await mandrill.info(id)
        res.json(data)
    } catch (err) {
        next(err)
    }
})

app.get('/message/:id/body', async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await mandrill.content(id)
        res.send(data.html)
    } catch (err) {
        next(err)
    }
})

app.get('/message/:id/attachments', async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await mandrill.content(id)
        res.send(data.html)
    } catch (err) {
        next(err)
    }
})

app.listen(3000)
