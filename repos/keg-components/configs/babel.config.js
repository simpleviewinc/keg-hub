module.exports = {
  presets: [ 
    ['@babel/preset-env', { loose: true }],
    ['@babel/preset-react', { loose: true }]
  ],
  plugins: [
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
    ['transform-react-remove-prop-types', { removeImport: 'true' }],
  ],
}
