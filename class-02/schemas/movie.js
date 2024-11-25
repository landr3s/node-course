import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    required_error: 'Title field is required',
    invalid_type_error: 'Invalid type at title field'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().positive(),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum([
      'Sci-Fi',
      'Terror',
      'Action',
      'Drama',
      'Crime',
      'Adventure',
      'Romance'
    ])
  ),
  rate: z.number().min(0).max(10).default(5.5)
})

export const validateMovie = input => {
  return movieSchema.safeParse(input)
}

export const validatePartialMovie = input => {
  return movieSchema.partial().safeParse(input)
}
