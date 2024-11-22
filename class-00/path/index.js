import { sep, extname, basename, join } from 'node:path'

console.log(sep)

console.log(extname('my.super.image.jpg'))

console.log(basename('my.super.image.jpg', '.jpg'))

console.log(join('node', 'class-00'))
