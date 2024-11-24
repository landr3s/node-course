import { createServer } from 'node:net'

export function findAvaliablePort(desiredPort) {
  return new Promise((resolve, reject) => {
    const server = createServer()
    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close()
      resolve(port)
    })
    server.on('error', err => {
      if (err === 'EADDRINUSE') {
        findAvaliablePort(0).then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}
