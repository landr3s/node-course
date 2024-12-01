import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel
  }
  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    if (id === -1) return res.json({ message: 'Movie not found' })
    const movie = await this.movieModel.getById({ id })
    res.json(movie)
  }

  create = async (req, res) => {
    const result = await validateMovie(req.body)
    if (result.error) {
      return res.json({ error: JSON.parse(result.error.message) })
    }
    const newMovie = await this.movieModel.create({ input: result.data })
    res.json(newMovie)
  }

  update = async (req, res) => {
    const result = await validatePartialMovie(req.body)
    const { id } = req.params
    if (id === -1) return res.json({ message: 'Movie not found' })
    const updatedMovie = await this.movieModel.update({
      id: id,
      input: result.data
    })
    res.json(updatedMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.movieModel.delete({ id })
    if (result === false)
      return res.status(400).json({ error: 'Movie not found' })
    res.json({ message: 'Movie deleted' })
  }
}
