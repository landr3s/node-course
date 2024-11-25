import { createServer } from 'node:http'

const PORT = process.env.PORT ?? 3000

const server = createServer((req, res) => {
  const { method, url } = req
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'text/html; encoding=utf-8')
          res.end('<h1>Hello World</h1>')
          break
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, {
              'Content-Type': 'application/json; encoding=utf-8'
            })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        }
      }
  }
})

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
