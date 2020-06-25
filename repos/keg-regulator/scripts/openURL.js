// cross-platform way to open a url in a browser: https://github.com/sindresorhus/open
const open = require('open')

/**
 * Command line docs
 * Example: node addMetadata.js ./test/output/chrome.json chrome latest
 * @param {String} arg1: url - to open in a browser
 */
const [ url ] = process.argv.slice(2)

open(url)
