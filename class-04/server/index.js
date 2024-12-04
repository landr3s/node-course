import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import Logger from 'morgan'

const PORT = process.env.PORT ?? 3000
const app = express()
const server = createServer(app)
const io = new Server(server)
app.use(Logger('dev'))

io.on('connection', socket => {
  console.log('User has connected')

  socket.on('disconnect', () => {
    console.log('an user has disconnected')
  })

  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })
})

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
