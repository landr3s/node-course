import { readFile } from 'node:fs/promises'

console.log('Reading first text: 🥇')
readFile('./note.txt', 'utf-8').then((text) => {
  console.log(text)
})

console.log('Do something even while execute code')

console.log('Reading second text: 🥈')
readFile('./note2.txt', 'utf-8').then((text) => {
  console.log(text)
})
console.log('Do something even while execute code is finish')
