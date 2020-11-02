module.exports = {
  ...require('./buildComposeCmd'),
  ...require('./buildServiceName'),
  ...require('./checkKillRunning'),
  ...require('./getComposeConfig'),
  ...require('./loadComposeConfig'),
  ...require('./removeInjectedCompose'),
}