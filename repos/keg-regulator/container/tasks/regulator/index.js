module.exports = {
  regulator: {
    name: 'regulator',
    description: 'Run keg-regulator tasks',
    tasks: {
      ...require('./start'),
    }
  },
}
