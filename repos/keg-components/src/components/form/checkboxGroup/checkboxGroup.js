import React, { useMemo } from 'react'
import { View } from 'KegView'
import { Text } from '../../typography/text'
import { Checkbox } from 'KegCheckbox'
import { useStylesMemo } from '@keg-hub/re-theme'
import { isBool } from '@keg-hub/jsutils'

/**
 * @param {*} props
 */
export const GroupHeader = ({ title, style, onPress, checked, ...rest }) => {
  const headerStyles = useMemo(() => ({
    main: style,
    content: {
      right: {}
    }
  }), [ style ])

  const textStyle = useMemo(() => ({ ...style, marginLeft: 27 }))
  
  const TextHeader = (
    <Text 
      style={textStyle} 
      onPress={onPress} 
      { ...rest }
    >
      { title }
    </Text>
  )

  return !onPress
    ? TextHeader
    : (
      <Checkbox 
        RightComponent={title}
        onChange={onPress}
        checked={true}
        styles={headerStyles}
        checked={checked}
        {...rest}
        close
      />
    )
}

/**
 * A group of checkbox items with a header
 * @param {Object} props
 * @param {string} props.title
 * @param {*} props.children - components in the group (@see CheckboxGroup.Item)
 * @param {Object?} props.styles
 * @param {Object?} props.styles.main
 * @param {Object?} props.styles.header
 */
export const CheckboxGroup = ({ title, children, styles, checked, onGroupPress }) => {
  const groupStyles = useStylesMemo('form.checkboxGroup', styles)
  return (
    <View style={groupStyles?.main}>
      <GroupHeader
        style={groupStyles?.header}
        title={title}
        onPress={onGroupPress}
        checked={checked}
      />
      { children }
    </View>
  )
}
CheckboxGroup.Item = Checkbox
