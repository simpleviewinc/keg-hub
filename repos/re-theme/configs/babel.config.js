module.exports = {
  presets: [
    "@babel/env",
    "@babel/preset-react"
  ],
  plugins: [
    [
      "@babel/plugin-proposal-class-properties",
      { loose: true } 
    ],
    ['transform-react-remove-prop-types', { removeImport: 'true' }],
  ]
}