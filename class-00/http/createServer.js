import { createServer } from 'node:http'
import { findAvaliablePort } from './findAvaliablePort.js'

const server = createServer((req, res) => {
  res.end('Hello World')
})

findAvaliablePort(3000).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})
