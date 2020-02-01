const showError = require('./show_error')

module.exports =  err => showError(err || {})

