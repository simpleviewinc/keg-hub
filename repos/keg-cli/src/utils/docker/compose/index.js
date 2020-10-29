module.exports = {
  ...require('./buildComposeCmd'),
  ...require('./buildServiceName'),
  ...require('./checkKillRunning'),
  ...require('./getComposeConfig'),
  ...require('./getServiceName'),
  ...require('./loadComposeConfig'),
  ...require('./removeInjected'),
}