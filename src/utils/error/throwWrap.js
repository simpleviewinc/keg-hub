
const throwWrap = (message) => {
  (() => { throw new Error(message) })()
}

module.exports = {
  throwWrap
}