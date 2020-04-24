module.exports = {
  DOCKER: {
    ...require('./build'),
    ...require('./run'),
    ...require('./volumes'),
  }
}