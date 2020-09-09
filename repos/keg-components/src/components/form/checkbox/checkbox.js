import React, { useMemo } from 'react'
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
    fontSize: 14,
    zIndex: 1,
    height: 14,
    width: 14,
    top: 0,
    left: 3,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  (
    { className, elProps, styles = noPropObj, icon, checked, ...props },
    ref
  ) => {
    const checkStyle = useMemo(() => {
      return {
        ...styles.indicator,
        ...checkBoxStyles.icon,
      }
    }, [ checkBoxStyles, styles ])

    return (
      <View
        style={styles.main}
        className={className}
      >
        <View
          className='keg-checkbox-area'
          style={styles.area}
        ></View>
        { checked && <Check
          className='keg-checkbox-icon'
          style={checkStyle}
        /> }
        <input
          className='keg-checkbox'
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
