import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(express.json())
  app.use(corsMiddleware())

  const PORT = process.env.PORT ?? 3000
  app.use('/movies', createMovieRouter({ movieModel }))

  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
  })
}
