import { readFile } from 'node:fs'

console.log('Reading first text: 🥇')
readFile('./note.txt', 'utf-8', (err, text) => {
  if (err) {
    return new Error('Error reading file')
  }
  console.log(text)
})

console.log('Do something even while execute code')

console.log('Reading second text: 🥈')
readFile('./note.txt', 'utf-8', (err, text) => {
  if (err) return new Error('Error reading file')

  console.log(text)
})

console.log('Do something even while execute code finish')
