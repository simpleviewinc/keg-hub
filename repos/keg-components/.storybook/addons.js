import React from 'react'
import '@storybook/addon-actions/register'
import '@storybook/addon-links/register'
import '@storybook/addon-storysource/register'

const oldWarn = console.warn
const warnOverride = (...data) => {
  return data[0].indexOf('The default hierarchy separators') === 0
    ? null
    : oldWarn(...data)
}
console.warn = warnOverride