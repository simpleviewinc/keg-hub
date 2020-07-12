module.exports = {
  ...require('./bddService'),
  ...require('./buildService'),
  ...require('./composeService'),
  ...require('./containerService'),
  ...require('./destroyService'),
  ...require('./mutagenService'),
  ...require('./remoteExecService'),
  ...require('./serviceOptions'),
  ...require('./startService'),
  ...require('./stopService'),
  ...require('./syncService'),
}