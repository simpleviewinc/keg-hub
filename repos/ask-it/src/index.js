#!/usr/bin/env node

require('module-alias/register')

module.exports = {
  ...require('./askIt'),
  ...require('KegModels'),
  ...require('KegPrompts'),
}