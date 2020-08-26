
// Holder for the original methods
const originals = {}

// Console methods to override
const overrides = [
  // 'log',
  'error',
  'warn',
  'data',
  'dir',
  'info',
]

// TODO: Need to fix. Console methods are overwritten, but original is not called!

// Replace the original method with a jest.fn, and call the original method inside
const replacer = method => jest.fn((...data) => originals[method](...data))

// Loop over the console methods to be overridden
// Store the original, and override the console with the replacer
overrides.map(method => {
  originals[method] = console[method]
  console[method] = replacer(method)
})

module.exports = {}