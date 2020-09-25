import React, { useCallback, useState, useMemo } from 'react'
import { View } from 'KegView'
import { Text } from '../../typography/text'
import { Checkbox } from 'KegCheckbox'
import { useStylesMemo } from '@keg-hub/re-theme'
import { isFunc } from '@keg-hub/jsutils'

/**
 * Simple header for CheckGroup, without any checkbox
 * @param {} param0 
 */
export const SimpleHeader = ({ title, style, ...rest }) => {
  const textStyle = useMemo(() => ({ ...style, marginLeft: 27 }), [ style ])
  console.log({style})
  return (
    <Text 
      style={textStyle} 
      { ...rest }
    >
      { title }
    </Text>
  )
}

/**
 * Header for CheckGroup, with a checkbox for select-all functionality
 * @param {*} props
 */
export const CheckboxHeader = ({ title, style, onPress, checked }) => {
  const headerStyles = useMemo(() => ({
    main: style,
    content: {
      right: {}
    }
  }), [ style ])

  const onChangeHandler = useCallback((_, val) => onPress?.(val), [onPress])

  return ( 
    <Checkbox 
      RightComponent={title}
      onChange={onPress}
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
 * @param {string} props.title - title of the group
 * @param {boolean?} props.initChecked - initial checked value of the group header box, if you are using it
 * @param {Function?} props.onGroupPress - handler of header checkbox
 * @param {*} props.children - components in the group (@see CheckboxGroup.Item)
 * @param {Object?} props.styles
 * @param {Object?} props.styles.main
 * @param {Object?} props.styles.header
 */
export const CheckGroup = ({ title, children, styles, initChecked=false, onGroupPress }) => {
  const groupStyles = useStylesMemo('form.checkGroup', styles)

  // if children is defined as a function, it's assumed it needs the groupProps for select-all behavior
  const useCheckboxHeader = isFunc(children)

  // store a list of all the children's 
  const [ checkedSetters, setCheckedSetters ] = useState([])

  // props to pass to all children, if the consumer defined them with render
  // includes a `setCheckedSetter` function that children can use to provide the CheckGroup
  // with the checked state setter cb, used with select-all behavior
  const groupProps = useMemo(() => ({ 
    setCheckedSetter: cb => 
      setCheckedSetters(current => [ ...current, cb ])
  }), [ setCheckedSetters ])

  // if children is a function, call that function with groupProps to enable select-all behavior.
  // otherwise, simply display children as-is
  const renderedChildren = useCheckboxHeader 
    ? children(groupProps) 
    : children

  // callback that manages select-all behavior on click of the header checkbox
  const headerCheckHandler = useCallback(checked => {
    onGroupPress?.(checked)
    checkedSetters.map(fn => isFunc(fn) && fn(checked))
  }, [ checkedSetters ])

  return (
    <View style={groupStyles?.main}>
      {
        useCheckboxHeader
          ? <CheckboxHeader
              style={groupStyles?.header}
              title={title}
              onPress={useCheckboxHeader && headerCheckHandler}
              checked={useCheckboxHeader ? initChecked : undefined}
            />
          : <SimpleHeader style={groupStyles?.header} title={title} />
      }
      { renderedChildren }
    </View>
  )
}
CheckGroup.Item = Checkbox
