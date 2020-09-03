const { isFunc, get, checkCall } = require('@keg-hub/jsutils')

const testFs = method => get(global, [ 'testMocks', 'fs', method ])

const handler = (data, cb) => isFunc(cb) && cb(global.testMocks.fs.error, testFs(data)) || testFs(data)

const createReadStream = jest.fn((_, __, cb) => {
  return { pipe: jest.fn() }
})
const createWriteStream = jest.fn((_, __, cb) => handler('writeStream', cb))

const existsSync = jest.fn((_, cb) => handler('exists', cb))

const lstatSync = jest.fn((_, cb) => handler('lstat', cb))
const lstat = jest.fn((_, cb) => handler('lstat', cb))

const mkdir = jest.fn((_, __, cb) => handler('mkdir', cb))
const mkdirSync = jest.fn((_, cb) => handler('mkdir', cb))

const readdirSync = jest.fn((_, cb) => {
  const items = [ 'test', 'foo', 'bar' ]
  checkCall(cb, items)
  return items
})
const readdir = jest.fn((_, cb) => {
  const items = [ 'test', 'foo', 'bar' ]
  checkCall(cb, items)
  return items
})

const readFile = jest.fn((_, __, cb) => handler('readFile', cb))
const readFileSync = jest.fn((_, __, cb) => { return _ })

const rename = jest.fn((_, __, cb) => handler('rename', cb))
const renameSync = jest.fn((_, __, cb) => handler('rename', cb))

const stat = jest.fn((_, cb) => handler('stat', cb))
const statSync = jest.fn((_, cb) => handler('stat', cb))

const writeFileSync = jest.fn((_, __, ____, cb) => handler('writeFile', cb))
const writeFile = jest.fn((_, __, ____, cb) => handler('writeFile', cb))

module.exports = {
  createReadStream,
  createWriteStream,
  existsSync,
  lstat,
  lstatSync,
  mkdir,
  mkdirSync,
  readdir,
  readdirSync,
  readFile,
  readFileSync,
  rename,
  renameSync,
  stat,
  statSync,
  writeFile,
  writeFileSync,
}
