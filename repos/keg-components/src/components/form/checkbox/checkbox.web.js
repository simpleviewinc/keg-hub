import React from 'react'
import { View } from 'KegView'
import { CheckboxWrapper } from './checkbox.wrapper'
import { Icon } from 'KegIcon'

const Element = React.forwardRef(
  ({ elProps, styles, icon, checked, ...props }, ref) => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.area}></View>
        { checked && <Icon
          styles={styles.indicator}
          name={icon || 'check'}
        /> }
        <input
          {...elProps}
          {...props}
          checked={checked}
          type='checkbox'
          ref={ref}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            margin: 0,
            opacity: 0,
            cursor: 'pointer',
          }}
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
