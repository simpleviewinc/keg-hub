import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { Text } from '../../typography/text'
import { Checkbox } from 'KegCheckbox'
import { useStyle } from '@keg-hub/re-theme'
import { useClassList } from 'KegClassList'
import { useChildrenWithRefs } from '../../../hooks/useChildrenWithRefs'
import { mapObj } from '@keg-hub/jsutils'

/**
 * Simple header for CheckGroup, without a checkbox
 * @param {Object} props
 * @param {string} props.title - title of header
 * @param {Object} props.style - style rules to apply to the Text element
 * @param {*} props.* - remaining props are passed to the Text element
 */
const SimpleHeader = ({ title, className, style, ...rest }) => {
  const textStyle = useStyle('form.checkGroup.simpleHeader.main', style)
  return (
    <Text
      className={className}
      style={textStyle}
      {...rest}
    >
      { title }
    </Text>
  )
}

/**
 * Header for CheckGroup, with a checkbox for select-all functionality
 * @param {Object} props
 * @param {string} props.title - title of header
 * @param {Object} props.style - style rules to apply to the header
 * @param {Function?} props.onPress - handler for checkbox press
 * @param {boolean} props.checked - initial value of header checkbox
 */
const CheckboxHeader = ({ title, className, style, onPress, checked }) => {
  const headerStyles = useMemo(
    () => ({
      main: style,
      content: {
        right: {},
      },
    }),
    [style]
  )

  const onChangeHandler = useCallback((_, val) => onPress?.(val), [onPress])

  return (
    <Checkbox
      RightComponent={title}
      rightClassName={className}
      styles={headerStyles}
      checked={checked}
      onChange={onChangeHandler}
      close
    />
  )
}

/**
 * A group of checkbox items with a header.
 * Will include a select-all checkbox in the header IF you define the children as a function (@see story examples)
 * @param {Object} props
 * @param {string} props.className - css class name
 * @param {string} props.headerClassName - css class name for header text
 * @param {string} props.title - title of the group
 * @param {boolean?} props.initChecked - initial checked value of the group header box, if you are using it
 * @param {boolean?} props.check - true if you want a group header check box
 * @param {Function?} props.onGroupPress - handler of header checkbox
 * @param {*} props.children - components in the group (@see CheckboxGroup.Item)
 * @param {Object?} props.styles
 * @param {Object?} props.styles.main
 * @param {Object?} props.styles.header
 */
export const CheckGroup = props => {
  const {
    className,
    headerClassName,
    title,
    children,
    styles,
    initChecked = false,
    onGroupPress,
    check = false,
  } = props

  const groupStyles = useStyle('form.checkGroup', styles)

  // get children updated with ref props, and the refs themselves
  const [ childrenWithProps, childRefs ] = useChildrenWithRefs(children, check)

  // callback that manages select-all behavior on click of the header checkbox
  const headerCheckHandler = useCallback(
    checked => {
      onGroupPress?.(checked)
      mapObj(childRefs.current, (_, child) => child?.setChecked?.(checked))
    },
    [childRefs]
  )

  return (
    <View
      className={useClassList('keg-check-group', className)}
      style={groupStyles?.main}
    >
      { check ? (
        <CheckboxHeader
          className={headerClassName}
          style={groupStyles?.header}
          title={title}
          onPress={check && headerCheckHandler}
          checked={check ? initChecked : undefined}
        />
      ) : (
        <SimpleHeader
          className={headerClassName}
          style={groupStyles?.header}
          title={title}
        />
      ) }
      { /* { renderedChildren } */ }
      { childrenWithProps }
    </View>
  )
}
CheckGroup.Item = Checkbox

CheckGroup.propTypes = {
  className: PropTypes.oneOfType([ PropTypes.array, PropTypes.string ]),
  headerClassName: PropTypes.oneOfType([ PropTypes.array, PropTypes.string ]),
  title: PropTypes.string,
  styles: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
  initChecked: PropTypes.bool,
  onGroupPress: PropTypes.func,
}
