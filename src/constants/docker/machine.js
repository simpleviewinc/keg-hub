const { deepFreeze, deepMerge, keyMap } = require('jsutils')

module.exports = deepFreeze({
  MACHINE: {
    NAME: 'docker-keg',
    IP: '192.168.99.101',
    BROADCAST: '192.168.99.255',
    SUBNET_MASK: '255.255.255.0'
  }
})