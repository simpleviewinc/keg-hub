module.exports = {
  presets: [ 
    ['@babel/preset-env', { loose: false, shippedProposals: true }],
    ['@babel/preset-react']
  ],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-private-methods'],
    ['transform-react-remove-prop-types', { removeImport: 'true' }],
  ],
}
