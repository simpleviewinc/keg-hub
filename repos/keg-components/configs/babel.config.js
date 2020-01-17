const path = require('path')
const { aliases } = require('./aliases.config')
const platform = process.env.RE_PLATFORM || 'web'

const resolvePath = toResolve => path.resolve(
  __dirname,
  toResolve.replace("${platform}", platform)
)

module.exports = {
  presets: [ "@babel/env", "@babel/preset-react" ],
  plugins: [
    [ "module-resolver", {
        root: ["./"],
        alias: {
          ...Object.entries(aliases)
            .reduce((updated, [ key, value ]) => {
              updated[key] = resolvePath(`../${value}`)
              
              return updated
            }, {}),
        }
    }]
  ]
}