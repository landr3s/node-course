// Sync VS Async

import { readFileSync } from 'node:fs'

const firstText = readFileSync('./note.txt', 'utf-8')
const secondText = readFileSync('./note2.txt', 'utf-8')
console.log(firstText)
console.log(secondText)
