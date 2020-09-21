import React from 'react'
import { Input as KegInput } from './input.native'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'
import PropTypes from 'prop-types'

export const Input = StyleInjector(
  KegInput,
  { displayName: 'Input', className: 'keg-input' }
)

Input.propTypes = {
  ...KegInput.propTypes,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
}
