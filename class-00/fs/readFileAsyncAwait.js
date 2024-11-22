import { readFile } from 'node:fs/promises'
console.log('Reading text: 🥇')
const text = await readFile('./note.txt', 'utf-8')
console.log(text)
console.log('Do something even while execute code')
console.log('Reading note: 🥈')
const note = await readFile('./note2.txt', 'utf-8')
console.log(note)
console.log('Do something even while execute code finish')
