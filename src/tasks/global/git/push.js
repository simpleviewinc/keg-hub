

const gitPushRepo = () => {
  console.log(`--- gitPushRepo ---`)
}

module.exports = {
  name: 'push',
  action: gitPushRepo,
  description: `Push local changes to a remote branch`,
  example: 'keg push <options>'
}