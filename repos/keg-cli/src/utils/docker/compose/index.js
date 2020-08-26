module.exports = {
  ...require('./buildComposeCmd'),
  ...require('./buildServiceName'),
  ...require('./checkKillRunning'),
  ...require('./getComposeConfig'),
  ...require('./getServiceName'),
  ...require('./getServicePorts'),
  ...require('./getServiceVolumes'),
  ...require('./getServiceValues'),
  ...require('./loadComposeConfig'),
  ...require('./removeInjected'),
}