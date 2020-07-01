module.exports = {
  ...require('./bddService'),
  ...require('./buildService'),
  ...require('./composeService'),
  ...require('./containerService'),
  ...require('./destroyService'),
  ...require('./mutagenService'),
  ...require('./stopService'),
  ...require('./serviceOptions'),
  ...require('./syncService'),
}