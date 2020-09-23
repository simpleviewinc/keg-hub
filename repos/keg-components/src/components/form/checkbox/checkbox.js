import { View } from 'KegView'
import { Check } from 'KegIcons'
import React, { useMemo } from 'react'
import { CheckboxWrapper } from './checkbox.wrapper'
import { noPropObj } from '../../../utils/helpers/noop'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

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

/**
 * @summary A simple wrapper around the a web input element
 * <br/> This is required because we can't just pass input to the StyleInjector
 * <br/> It requires a React component, and input gets viewed as a variable
 * @param {Object} props - props object. Accepts all standard <input /> props which will be passed to the input element. Additional props:
 */
const InputComp = props => (<input {...props} />)

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

    const InjectedComp = StyleInjector(
      InputComp,
      { displayName: 'Checkbox', className: 'keg-checkbox' }
    )

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
        <InjectedComp
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
