const path = require('path')
const { resolvedAlias } = require('./aliases.config')

module.exports = {
  presets: [ '@babel/preset-env', '@babel/preset-react' ],
  plugins: [
    [ '@babel/plugin-proposal-optional-chaining' ],
    [ '@babel/plugin-proposal-class-properties' ],
    [ 'module-resolver', {
        root: ["./"],
        alias: resolvedAlias,
    }]
  ]
}