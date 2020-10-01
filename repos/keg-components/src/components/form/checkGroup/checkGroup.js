import React, { useCallback, useState, useRef, useMemo } from 'react'
import { View } from 'KegView'
import { Text } from '../../typography/text'
import { Checkbox } from 'KegCheckbox'
import { useStyle } from '@keg-hub/re-theme'
import { useClassList } from 'KegClassList'
import { isFunc } from '@keg-hub/jsutils'

/**
 * Simple header for CheckGroup, without a checkbox
 * @param {Object} props
 * @param {string} props.title - title of header
 * @param {Object} props.style - style rules to apply to the Text element
 * @param {*} props.* - remaining props are passed to the Text element
 */
export const SimpleHeader = ({ title, style, ...rest }) => {
  const textStyle = useMemo(() => ({ ...style, marginLeft: 27 }), [ style ])
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
 * @param {Object} props
 * @param {string} props.title - title of header
 * @param {Object} props.style - style rules to apply to the header
 * @param {Function?} props.onPress - handler for checkbox press
 * @param {boolean} props.checked - initial value of header checkbox
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
 * Returns the object to be passed to CheckGroup children,
 * assuming the consumer defined them in render-prop format
 * Currently the object contains these props:
 *   - ref: a ref-setter function to acquire references to child components
 * @return {Object} render props for children
 * 
 * @example
 * const props = useGroupRenderProps()
 * return (
 *  {
 *    isFunc(children) ? children(props) : children
 *  }
 * )
 */
const useGroupRenderProps = (childRefs) => {

  // props to pass to all children, if the consumer defined them with render
  // includes a `ref` function that each child can use to provide the CheckGroup
  // with a ref to itself, used for behavior spanning all children (like select-all)
  return useMemo(() => ({ 
    ref: childRef => {
      childRefs.current = [ ...childRefs.current, childRef ]
    }
  }), [ childRefs ])
}

/**
 * A group of checkbox items with a header.
 * Will include a select-all checkbox in the header IF you define the children as a function (@see story examples)
 * @param {Object} props
 * @param {string} props.className - css class name
 * @param {string} props.title - title of the group
 * @param {boolean?} props.initChecked - initial checked value of the group header box, if you are using it
 * @param {Function?} props.onGroupPress - handler of header checkbox
 * @param {*} props.children - components in the group (@see CheckboxGroup.Item)
 * @param {Object?} props.styles
 * @param {Object?} props.styles.main
 * @param {Object?} props.styles.header
 */
export const CheckGroup = ({ className, title, children, styles, initChecked=false, onGroupPress }) => {
  const groupStyles = useStyle('form.checkGroup', styles)

  // if children is defined as a function, it's assumed it needs the groupProps for select-all behavior
  const renderCheckboxHeader = isFunc(children)

  // store a list of refs to all the children
  const childRefs = useRef([])

  const renderProps = useGroupRenderProps(childRefs)

  // if children is a function, call that function with groupProps to enable select-all behavior.
  // otherwise, simply display children as-is
  const renderedChildren = renderCheckboxHeader 
    ? children(renderProps) 
    : children

  // callback that manages select-all behavior on click of the header checkbox
  const headerCheckHandler = useCallback(checked => {
    onGroupPress?.(checked)
    childRefs.current.map(child => child?.setChecked?.(checked))
  }, [ childRefs ])

  return (
    <View 
      className={useClassList('keg-check-group', className)} 
      style={groupStyles?.main}
    >
      {
        renderCheckboxHeader
          ? <CheckboxHeader
              style={groupStyles?.header}
              title={title}
              onPress={renderCheckboxHeader && headerCheckHandler}
              checked={renderCheckboxHeader ? initChecked : undefined}
            />
          : <SimpleHeader style={groupStyles?.header} title={title} />
      }
      { renderedChildren }
    </View>
  )
}
CheckGroup.Item = Checkbox
