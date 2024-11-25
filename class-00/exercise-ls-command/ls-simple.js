import { readdir } from 'node:fs/promises'

const folder = process.argv[2] ?? '.'

const ls = folder => {
  readdir(folder)
    .then(files => {
      files.forEach(file => {
        console.log(file)
      })
    })
    .catch(error => {
      console.error(error)
    })
}

ls(folder)
