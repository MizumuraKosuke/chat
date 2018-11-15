import Messages from './mongodb'
import bodyParser from 'body-parser'
import emitter from 'socket.io-emitter'
import express from 'express'
import ejs from 'ejs'
import http from 'http'
import path from 'path'

const app = express()
const server = http.Server(app)

app.use(express.json())
app.use(express.urlencoded())
app.use(bodyParser.json())

app.use('/static', express.static('public'))

app.get('/chat', (req, res) => {
    Messages.find((err, docs) => {
        res.json(docs)
    })
})

server.listen(3010, () => {
    console.log('listening on *:3010')
})
