import { readdir, stat } from 'node:fs/promises'
import { basename, join } from 'node:path'

const folder = process.argv[2] ?? '.'

async function ls(directory) {
  let files
  try {
    files = await readdir(directory)
  } catch (error) {
    console.error('Error reading folder')
  }
  const filesPromises = files.map(async file => {
    let stats
    const filePath = join(directory, file)
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

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach(async fileInfo => {
    console.log(fileInfo)
  })
}

ls(folder)
