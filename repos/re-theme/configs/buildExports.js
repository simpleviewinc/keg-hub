// List of alternate exports
// This allows importing only when you need
const buildExports = {
  index: `./src/index`,
  reStyle: './src/reStyle/index.js',
  styleInjector: './src/styleInjector/index{{platform}}',
  colors: './src/helpers/colors.js',
}

module.exports = {
  buildExports
}
