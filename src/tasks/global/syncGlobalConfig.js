
const syncGlobalConfig = () => {
  console.log(`--- Sync global config ---`)
}

module.exports = {
  name: 'sync',
  action: syncGlobalConfig,
  description: `Syncs config from this repo with the global config.`,
  example: 'keg global sync <options>'
}