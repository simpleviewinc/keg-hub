const builders = require('./builders')
const resolvers = require('./resolvers')
const runSetup = require('./runSetup')
const tap = require('./tap')

exports = {
  ...builders,
  ...resolvers,
  ...tap,
  runSetup,
}