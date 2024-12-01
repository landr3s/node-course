import z from 'zod'

const movieSchemma = z.object({
  title: z.string({
    required_error: 'Title is required',
    invalid_type_error: 'Title must be a string'
  }),
  year: z.number().min(1900).max(2025),
  director: z.string(),
  duration: z.number().positive(),
  poster: z.string().url(),
  genre: z.array(z.enum(['Action', 'Crime', 'Drama', 'Sci-Fi', 'Terror'])),
  rate: z.number().min(0).max(10).default(5.5)
})

export const validatePartialMovie = async shape => {
  return movieSchemma.partial().safeParseAsync(shape)
}
export const validateMovie = async shape => {
  return movieSchemma.safeParseAsync(shape)
}
