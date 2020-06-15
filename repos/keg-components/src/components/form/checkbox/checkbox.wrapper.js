import React from 'react'
import { SwitchWrapper } from '../switch/switch.wrapper'

/**
 * CheckboxWrapper
 * Wraps the Passed in Checkbox Element which should be a Checkbox for the platform type
 * @param {Object} props - see PropTypes below
 *
 */
export const CheckboxWrapper = props => {
  return <SwitchWrapper {...props} />
}

CheckboxWrapper.propTypes = { ...SwitchWrapper.propTypes }
