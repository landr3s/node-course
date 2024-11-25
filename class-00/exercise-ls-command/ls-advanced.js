import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const directory = process.argv[2] ?? '.'

async function ls(folder) {
  let files
  try {
    files = await readdir(folder)
  } catch (error) {
    console.error('Error reading folder')
  }

  const filesPromises = files.map(async file => {
    let stats
    const filePath = join(folder, file)
    try {
      stats = await stat(filePath)
    } catch (error) {
      console.error('Error reading file')
    }
    const isDir = stats.isDirectory()
    const fileType = isDir ? 'D' : 'F'
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleDateString()

    return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(
      10
    )} ${fileModified}`
  })

  const fileInfos = await Promise.all(filesPromises)

  fileInfos.forEach(async element => {
    console.log(element)
  })
}

ls(directory)
