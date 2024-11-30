import { Router } from 'express'
import fs from 'node:fs'

const moviesRouter = Router()
const movies = JSON.parse(fs.readFileSync('./movies.json'))

moviesRouter.get('/', (req, res) => {
  const { genre } = req.params
  if (genre) {
    const filteredMovies = movies.map(movie =>
      movie.genre.includes(g => g.toLowerCase() === genre.toLowerCase())
    )
    res.json(filteredMovies)
  }
  res.json(movies)
})

export default moviesRouter
