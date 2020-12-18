const { dockerData, dockerOutput } = require('./docker')

const getContainerData = (params, cmdOpts) => {
  const { opts, errResponse, log, skipError, format='', force } = params

}

const getImageData = (params, cmdOpts) => {
  const { opts, errResponse, log, skipError, format='', force } = params

  switch(opts[1]){
    case 'ls': {
      return Object.values(dockerData.images)
    }
  }

}

const dockerCli = jest.fn((params, cmdOpts) => {
  const { opts } = params

  return new Promise((res, rej) => {
    const command = opts[0]
    const data = command === 'image'
      ? getImageData(params, cmdOpts)
      : command === 'container'
        ? getContainerData(params, cmdOpts)
        : false
    
    if(data) return res(data)
  
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

const remove = jest.fn((args) => {
  return args
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