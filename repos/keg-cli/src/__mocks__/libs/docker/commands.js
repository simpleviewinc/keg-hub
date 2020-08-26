
const dockerCli = jest.fn((params, cmdOpts) => {
  const { opts, errResponse, log, skipError, format='', force } = params
  return new Promise((res, rej) => {
    return format === 'json'
      ? { params, cmdOpts }
      : ''
  })
})

const dynamicCmd = jest.fn(() => {

})

const login = jest.fn(() => {

})

const log = jest.fn(() => {

})

const logs = jest.fn(() => {

})

const prune = jest.fn(() => {

})

const pull = jest.fn(() => {

})

const push = jest.fn(() => {

})


const raw = jest.fn(() => {

})

const remove = jest.fn(() => {

})


module.exports = {
  dockerCli,
  dynamicCmd,
  login,
  log,
  logs,
  prune,
  pull,
  push,
  raw,
  remove,
}