import React from 'react'
import { View } from 'KegView'
import { CheckboxWrapper } from './checkbox.wrapper'
import { Check } from 'KegIcons'
import { noPropObj } from '../../../utils/helpers/noop'

// Styles are defined here so that they are enforced
// Due to how the checkbox is designed, these styles should not be changed
// Which is why they are not defined within the theme
const checkBoxStyles = {
  icon: {
    position: 'relative',
    zIndex: 1,
    height: 16,
    width: 16,
    top: 'calc( 50% - 8px)',
    left: 'calc( 50% - 8px)',
  },
  input: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    margin: 0,
    opacity: 0,
    cursor: 'pointer',
  },
}

const Element = React.forwardRef(
  ({ elProps, styles = noPropObj, icon, checked, ...props }, ref) => {
    return (
      <View style={styles.main}>
        <View style={styles.area}></View>
        { checked && <Check style={checkBoxStyles.icon} /> }
        <input
          {...elProps}
          {...props}
          role='checkbox'
          checked={checked}
          type='checkbox'
          ref={ref}
          style={checkBoxStyles.input}
        />
      </View>
    )
  }
)

export const Checkbox = props => (
  <CheckboxWrapper
    {...props}
    elType={'checkbox'}
    Element={Element}
    isWeb={true}
  />
)

Checkbox.propTypes = { ...CheckboxWrapper.propTypes }
