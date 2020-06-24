module.exports = {
  ...require('./buildService'),
  ...require('./composeService'),
  ...require('./containerService'),
  ...require('./destroyService'),
  ...require('./mutagenService'),
  ...require('./stopService'),
  ...require('./serviceOptions'),
}