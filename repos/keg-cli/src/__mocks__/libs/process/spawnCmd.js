const spawnCmd = jest.fn((...args) => {
  return new Promise((res, rej) => {
    return res('')
  })
})

const asyncCmd = jest.fn(() => {
  return new Promise((res, rej) => {
    return res('')
  })
})


module.exports = {
  asyncCmd,
  spawnCmd,
}