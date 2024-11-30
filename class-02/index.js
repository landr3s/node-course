import express from 'express'
import fs from 'fs'
const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'))
import { validateMovie, validatePartialMovie } from './schemas/movie.js'
const app = express()
const PORT = 3000
const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:3000']
app.disable('x-powered-by')
app.use(express.json())

app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie =>
      movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.status(200).json(filteredMovies)
  }
  res.json(movies)
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(400).send("Movie doesn't exist")

  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }
  const selectedMovie = movies[movieIndex]

  const updatedMovie = {
    ...selectedMovie,
    ...result.data
  }

  res.status(200).json(updatedMovie)
})

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.json({ message: 'Movie not found' })

  movies.splice(movieIndex, 1)

  res.json({ message: 'Movie deleted' })
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  }
  res.send(200)
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
