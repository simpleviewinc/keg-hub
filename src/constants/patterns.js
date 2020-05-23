const { deepFreeze, keyMap } = require('jsutils')

module.exports = deepFreeze({
  // Pattern matching
  SPACE_MATCH: / [ ]+/,
  NEWLINE: '\n',
  NEWLINES_MATCH: /\n|\r|\r\n/,
  NEWLINES_ESC: /\\n/g,
  KEY_VAL_MATCH: /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,
})