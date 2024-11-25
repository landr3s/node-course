import express from 'express'
import movies from './movies.json' with { type: 'json' }

const app = express()
const PORT = 3000

app.disable('x-powered-by')
app.use(express.json())

app.get('/movies', (req, res) => {
  res.json(movies)
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
