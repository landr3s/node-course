import express from 'express'
import movies from './movies.json' with { type: 'json' }
import { validateMovie, validatePartialMovie } from './schemas/movie.js'
const app = express()
const PORT = 3000

app.disable('x-powered-by')
app.use(express.json())

app.get('/movies', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  const {genre} = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.status(200).json(filteredMovies)
  }
  res.json(movies)
})

app.post("/movies", (req, res) => {

  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({message: JSON.parse(result.error.message)})
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)

})

app.patch("/movies/:id", (req, res) => {
  const {id} = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(400).send("Movie doesn't exist")
  
  const result = validatePartialMovie(req.body)


  if (!result.success) {
    return res.status(400).json({ message: JSON.parse(result.error.message)})
  }
  const selectedMovie = movies[movieIndex]

  const updatedMovie = {
    ...selectedMovie,
    ...result.data
  }
  
  res.status(200).json(updatedMovie)
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
