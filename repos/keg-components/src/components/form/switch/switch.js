import { View } from 'KegView'
import PropTypes from 'prop-types'
import { Text } from '../../typography'
import { useTheme } from '@keg-hub/re-theme'
import React, { useState, useImperativeHandle, useMemo, forwardRef } from 'react'
import { useThemeTypeAsClass } from 'KegTypeAsClass'
import { useThemePath } from '../../../hooks'
import { get, isStr, toBool, checkCall } from '@keg-hub/jsutils'
import { getOnChangeHandler, getChecked, renderFromType } from '../../../utils'
import { Switch as InternalSwitch } from '../../internal/switch.js'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'

/**
 * Wrap the internal component with the Styles Injector Hoc
 * <br/>This allows us to add the styles as css classes
 */
const KegSwitch = StyleInjector(InternalSwitch, {
  displayName: 'Switch',
  className: 'keg-switch'
})

/**
 * Gets the custom Native Switch colors from the passed in styles
 * @param {string} thumbColor - Color of the on/off indicator
 * @param {string} trackColor - Color of the background track
 * @param {Object} styles - { indicator={}, area={} } - passed in switch styles
 *
 * @returns {Object} - Contains the Native color props for the Switch component
 */
const getSwitchColors = (
  thumbColor,
  trackColor,
  { indicator = {}, area = {} }
) => {
  const indicatorColor = thumbColor || indicator.color
  const areaColor = trackColor || area.backgroundColor
  const colors = {
    ...(indicatorColor && { thumbColor: thumbColor || color }),
    ...(areaColor && { trackColor: areaColor, onTintColor: areaColor }),
  }

  return colors
}

/**
 * Optimizes the check and non-checked styles so they don't have to be rebuilt on each render
 * Checked styles only rebuild when isChecked value has changed
 * @param {boolean} isChecked - Current state of the switch component
 * @param {Object} themeStyles - Styles of the Switch component
 *
 * @returns {Object} - Styles with the correct values based on isChecked state
 */
const useCheckedState = (isChecked, themeStyles) => {
  const theme = useTheme()
  return useMemo(() => {
    return theme.join(themeStyles, {
      content: {
        area: {
          ...get(themeStyles, 'content.area.off'),
          ...(isChecked && get(themeStyles, 'content.area.on')),
        },
        indicator: {
          ...get(themeStyles, 'content.indicator.off'),
          ...(isChecked && get(themeStyles, 'content.indicator.on')),
        },
      },
    })
  }, [isChecked])
}

/**
 * Sets / Updates the value of the checked Component
 * Calls the callback, if it's passed in
 * @param {boolean} isChecked - Current state of the check value
 * @param {function} setChecked - Update the checked state
 * @param {function} onChange - Callback to call when the state changes
 *
 * @returns {function} - The checked state update function
 */
const setCheckedValue = (isChecked, setChecked, onChange) => {
  return event => {
    setChecked(!isChecked)
    checkCall(onChange, event, !isChecked)
  }
}

/**
 * Side
 * @summary builds the side sections of the Switch
 * @param {Object} props
 * @property {React Component|string|Object|Array} Component  - custom component to display in the section.
 * @property {Object} style - default headerstyle obj for section
 *
 * @returns {Component} - section component
 */
const SideComponent = ({ Component, style }) => {
  return isStr(Component) ? (
    <Text style={style}>{ Component }</Text>
  ) : (
    renderFromType(Component, { style: styles.content })
  )
}

/**
 * Finds the children type and returns them in the format needed to render
 * @param {Object|Array|string} props.children - Child components to render
 *
 * @returns {React Component|Object|Array}
 */
const ChildrenComponent = ({ children }) => (
  <>{ renderFromType(children, {}, null) }</>
)

/**
 * Exposes an imperative api for the consumer of switch 
 * @param {RefObject} ref 
 * @param {boolean} isChecked
 * @param {Function} setChecked 
 */
const useSwitchHandle = (ref, isChecked, setChecked) => {
  return useImperativeHandle(
    ref,
    () => ({ 
      isChecked,
      setChecked 
    })
  )
}

/**
 * Switch
 * Wraps the Internal KegSwitch which should be a Switch for the platform type
 * @param {Object} props - see PropTypes below
 *
 */
export const Switch = forwardRef((props, ref) => {
  const {
    className,
    checked,
    children,
    elType,
    disabled,
    LeftComponent,
    close,
    onChange,
    onValueChange,
    RightComponent,
    styles,
    SwitchComponent,
    setCheckedSetter,
    type,
    themePath,
    thumbColor,
    trackColor,
    value,
    ...elProps
  } = props

  const [ isChecked, setChecked ] = useState(toBool(checked || value))

  // by default, switch manages its own toggled state.
  // however, if the consumer needs to control that, it can by passing
  // in a `ref`, then calling ref.current.setChecked to control the value
  useSwitchHandle(ref, isChecked, setChecked)

  const elThemePath =
    themePath || `form.switch.${(close && 'close') || 'default'}`
  const themeStyles = useThemePath(elThemePath, styles)
  const activeStyles = useCheckedState(isChecked, themeStyles)
  const typeClassName = useThemeTypeAsClass(
    elThemePath || type,
    'keg-switch',
    className
  )

  return (
    (children && (
      <View
        className={typeClassName}
        style={activeStyles.main}
      >
        <ChildrenComponent
          className='keg-switch-container'
          children={children}
        />
      </View>
    )) || (
      <View
        className={typeClassName}
        style={activeStyles.main}
      >
        { LeftComponent && (
          <SideComponent
            className='keg-switch-left'
            Component={LeftComponent}
            style={activeStyles.content.left}
          />
        ) }

        { SwitchComponent ? (
          renderFromType(SwitchComponent, {
            ...props,
            styles: activeStyles.content,
          })
        ) : (
          <KegSwitch
            elProps={elProps}
            disabled={disabled}
            styles={activeStyles.content}
            {...getSwitchColors(thumbColor, trackColor, activeStyles.content)}
            {...getChecked(false, isChecked)}
            {...getOnChangeHandler(
              false,
              setCheckedValue(isChecked, setChecked, onChange || onValueChange)
            )}
          />
        ) }

        { RightComponent && (
          <SideComponent
            className='keg-switch-right'
            Component={RightComponent}
            style={activeStyles.content.right}
          />
        ) }
      </View>
    )
  )
})

Switch.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  disabled: PropTypes.bool,
  LeftComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
    PropTypes.element,
  ]),
  RightComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
    PropTypes.element,
  ]),
  SwitchComponent: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
    PropTypes.element,
  ]),
  onChange: PropTypes.func,
  onValueChange: PropTypes.func,
  styles: PropTypes.object,
  text: PropTypes.string,
  themePath: PropTypes.string,
  thumbColor: PropTypes.string,
  trackColor: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.bool,
}
