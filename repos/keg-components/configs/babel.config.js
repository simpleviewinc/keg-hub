module.exports = {
  presets: [ 
    ['@babel/preset-env'],
    ['@babel/preset-react']
  ],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-class-properties'],
    ["@babel/plugin-proposal-private-methods"],
    ["@babel/plugin-proposal-private-property-in-object"],
    ['transform-react-remove-prop-types', { removeImport: 'true' }],
  ],
}

// ['@babel/preset-env', { loose: true, shippedProposals: true }],