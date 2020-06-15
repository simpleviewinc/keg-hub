import React from 'react'
import PropTypes from 'prop-types'
import { isStr, isNum } from 'jsutils'
import { Picker } from 'react-native'
const SelectOption = Picker.Item

const useable = item => (isStr(item) || isNum(item)) && item

const getVal = (value, text, children, label) =>
  useable(value) || useable(text) || useable(children) || useable(label)

export const Option = props => {
  const { label, children, text, value } = props

  return (
    <SelectOption
      label={getVal(label, value, text)}
      value={getVal(value, text, children, label)}
    />
  )
}

Option.propTypes = {
  children: PropTypes.string,
  label: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
}
