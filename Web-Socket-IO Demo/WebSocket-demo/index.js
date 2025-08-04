const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})
app.use(cors())

io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
        io.emit('message', message)
    })
})

server.listen(5000, () => console.log(`Server started at 5000`))