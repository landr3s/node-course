import fs from 'node:fs'

const movies = JSON.parse(fs.readFileSync('./movies.json'))

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter(movie =>
        movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }
  static getById = async ({ id }) => {
    if (id === -1) return new Error('Movie not found')
    const movie = movies.find(movie => movie.id === id)
    return movie
  }
  static create = async ({ input }) => {
    const newMovie = {
      id: crypto.randomUUID(),
      ...input
    }
    return newMovie
  }
  static delete = async ({ id }) => {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(id, 1)
    return true
  }
  static update = async ({ id, input }) => {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    const selectedMovie = movies[movieIndex]
    const updatedMovie = {
      ...selectedMovie,
      ...input
    }
    return updatedMovie
  }
}
