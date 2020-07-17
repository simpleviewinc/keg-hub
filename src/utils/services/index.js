module.exports = {
  ...require('./bddService'),
  ...require('./buildService'),
  ...require('./composeService'),
  ...require('./containerService'),
  ...require('./destroyService'),
  ...require('./mutagenService'),
  ...require('./remoteExecService'),
  ...require('./packageService'),
  ...require('./serviceOptions'),
  ...require('./startService'),
  ...require('./stopService'),
  ...require('./syncService'),
}