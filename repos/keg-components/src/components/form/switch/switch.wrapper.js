import { View } from 'KegView'
import PropTypes from 'prop-types'
import { Text } from '../../typography'
import { useTheme } from '@keg-hub/re-theme'
import React, { useState, useMemo } from 'react'
import { useThemeTypeAsClass } from 'KegTypeAsClass'
import { useThemePath } from '../../../hooks'
import { get, isStr, toBool, checkCall } from '@keg-hub/jsutils'
import { getOnChangeHandler, getChecked, renderFromType } from '../../../utils'

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
 * SwitchWrapper
 * Wraps the Passed in Switch Element which should be a Switch for the platform type
 * @param {Object} props - see PropTypes below
 *
 */
export const SwitchWrapper = props => {
  const {
    className,
    checked,
    children,
    elType,
    Element,
    disabled,
    isWeb,
    LeftComponent,
    close,
    onChange,
    onValueChange,
    ref,
    RightComponent,
    styles,
    SwitchComponent,
    type,
    themePath,
    value,
    ...elProps
  } = props

  const [ isChecked, setChecked ] = useState(toBool(checked || value))

  const elThemePath =
    themePath || `form.${elType}.${(close && 'close') || 'default'}`
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
          <Element
            elProps={elProps}
            disabled={disabled}
            styles={activeStyles.content}
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
}

SwitchWrapper.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
  isWeb: PropTypes.bool,
  Element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
    PropTypes.element,
  ]),
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
  ref: PropTypes.object,
  styles: PropTypes.object,
  text: PropTypes.string,
  themePath: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.bool,
}
