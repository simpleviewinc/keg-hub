const { deepFreeze, deepMerge, keyMap } = require('jsutils')

const DEFAULT = {
  VALUES: {
    port: '-p 80:80',
    clean: '--rm',
    attached: '-it',
    detached: '-d',
  },
  DEFAULTS: {
    port: true,
    attached: true,
    clean: true,
    network: true,
  }
}

module.exports = deepFreeze({
  RUN: {
    CORE: deepMerge(DEFAULT, {}),
    TAP: deepMerge(DEFAULT, {
      VALUES: {
        port: '-p 80:19006 -p 19002:19002',
      },
    }),
  }
})