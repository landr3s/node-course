import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./note.txt', 'utf-8'),
  readFile('./note2.txt', 'utf-8')
]).then(([firstText, secondText]) => {
  console.log(firstText)
  console.log(secondText)
})
