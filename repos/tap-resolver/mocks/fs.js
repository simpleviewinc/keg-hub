const { isFunc, get } = require('jsutils')

const testFs = method => get(global, [ 'testMocks', 'fs', method ])

const handler = (data, cb) => isFunc(cb) && cb(global.testMocks.fs.error, testFs(data)) || data

const readdirSync = jest.fn((_, cb) => handler('dirFiles', cb))

const writeFileSync = jest.fn((_, _, _, cb) => handler('writeFile', cb))

const lstatSync = jest.fn((_, cb) => handler('lstat', cb))

const stat = jest.fn((_, cb) => handler('stat', cb))

const existsSync = jest.fn((_, cb) => handler('exists', cb))

const mkdirSync = jest.fn((_, cb) => handler('mkdir', cb))

module.exports = {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  stat,
  writeFileSync,
}