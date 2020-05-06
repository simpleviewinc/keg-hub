module.exports = {
  DOCKER: {
    ...require('./build'),
    ...require('./machine'),
    ...require('./run'),
    ...require('./volumes'),
  }
}