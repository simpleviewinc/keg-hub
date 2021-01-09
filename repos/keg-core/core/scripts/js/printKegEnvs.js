const { getKegEnvs } = require('./getKegEnvs')
const path = require('path')

/**
 * @example
 * node printKegEnvs.js /keg/tap/node_modules/keg-core /keg/tap
 */
const [ , , corePath, tapPath ] = process.argv

const envs = getKegEnvs(
  tapPath && path.resolve(tapPath),
  corePath && path.resolve(corePath)
)

console.log(envs)
