module.exports = {
  presets: [ '@babel/preset-env', '@babel/preset-react' ],
  plugins: [
    [ '@babel/plugin-proposal-optional-chaining' ],
    [ '@babel/plugin-proposal-class-properties' ],
    ['transform-react-remove-prop-types', { removeImport: 'true' }],
  ],
}
