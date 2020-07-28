import * as express from 'express'
import { Mandrill } from './mandrill'

const mandrill = Mandrill('gPiMfpGJ1BQ5nTRWrDMeVg')

const app = express()

app.get('/messages/search', async (req, res, next) => {
    try {
        const { query, date_from } = req.query as { [key: string]: any }
        const data = await mandrill.search({
            query: 'subject:*pass*',
        })
        res.json(data)
    } catch (err) {
        next(err)
    }
})

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

app.listen(3000, () => {
    console.log('Listening at', 3000)
})
