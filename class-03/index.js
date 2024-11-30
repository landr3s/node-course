import express from 'express'
import moviesRouter from './routes/movies.js'

const app = express()
const PORT = process.env.PORT ?? 3000
app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
