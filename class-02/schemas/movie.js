import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    required_error: ""
  })
})

const validateMovie = (input) => {
 return 
}

const validatePartialMovie = input => {}