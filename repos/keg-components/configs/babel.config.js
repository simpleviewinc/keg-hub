module.exports = {
  assumptions: {
    setPublicClassFields: true,
    privateFieldsAsProperties: true,
  },
  presets: [ 
    ['@babel/preset-env'],
    ['@babel/preset-react']
  ],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-private-methods'],
    ['transform-react-remove-prop-types', { removeImport: 'true' }],
  ],
}
