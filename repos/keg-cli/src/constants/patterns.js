const { deepFreeze, keyMap } = require('@svkeg/jsutils')

// Pattern matching (RegEx)
module.exports = deepFreeze({
  KEY_VAL_MATCH: /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/,
  NEWLINE: '\n',
  TAB_MATCH: '\t',
  NEWLINES_ESC: /\\n/g,
  NEWLINES_MATCH: /\n|\r|\r\n/,
  SPACE_MATCH: / [ ]+/,
  WHITESPACE_MATCH: /[\s]+/,
  BULLET_MATCH: /[\s]+(\*|-)/g,
})