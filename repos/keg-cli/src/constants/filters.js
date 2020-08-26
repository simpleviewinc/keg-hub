const { deepFreeze } = require('@svkeg/jsutils')

// Pattern matching (RegEx)
module.exports = deepFreeze({
  FILTERS: {
    DEFAULT: [],
    SYNC: [
      'note:  ',
      'ok  ',
      'success  ',
      '/Library/Ruby/Gems',
      'from /Users/',
    ],
    FORCE_LOG: [
      'EXCEPTION: ',
      'MESSAGE: ',
    ]
  }
})