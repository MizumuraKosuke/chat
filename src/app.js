import Messages from './mongodb'
import express from 'express'
import http from 'http'
import next from 'next'
import redisAdapter from 'socket.io-redis'
import socketio from 'socket.io'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const app = express()
const server = http.Server(app)
const io = socketio(server)

io.adapter(redisAdapter({ host: 'localhost', port: 6379 }))
        
const chat = io.of('/chat')

chat.on('connection', socket => {
    let name
    socket.on('chat message', data => {
        const id = socket.id
        const messages = new Messages()
        messages.name = data.name
        messages.message = data.message
        messages.date = Date.now()
        messages.save().then(messages => {
            chat.to(id).emit('my message', messages)
            socket.broadcast.emit('broad message', messages)
        })
        console.log(data)
    })

    socket.on('personal', data => {
        const id = socket.id
        console.log(data)
        chat.to(id).emit('mes', data)
    })

    socket.on('broadcast', data => {
        socket.broadcast.emit('mes', data)
    })

    socket.on('deleteDB', () => {
        Messages.remove().then(() => {
            socket.emit('db drop')
            socket.broadcast.emit('db drop')
        })
    })
})

nextApp.prepare()
    .then(() => {  
        app.get('*', (req, res) => {
            return handle(req, res)
        })
        
        server.listen(3000, () => {
            console.log('listening on *:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })
