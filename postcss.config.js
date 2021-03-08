module.exports = require('./configs/postcss.config')
module.exports = {
  plugins: [
    require('postcss-preset-env')(),
    require('cssnano')(),
  ],
}
