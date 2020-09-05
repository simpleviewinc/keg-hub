import React from 'react'
import { withTheme } from '@keg-hub/re-theme'
import { Text as RNText } from 'react-native'
import { useClassName } from '../../hooks/useClassName'

const ellipsisProps = {
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}
export const KegText = element => {
  return withTheme(React.forwardRef((props, ref) => {
    const { children, className, dataSet, style, theme, ellipsis, ...attrs } = props
    
    const textRef = useClassName(className, dataSet, ref)
    
    // Get the styles for the text element
    const textStyles = theme.get(
      'typography.font.family',
      'typography.default',
      element && `typography.${element}`
    )

    return (
      <RNText
        {...attrs}
        {...(ellipsis && ellipsisProps)}
        style={theme.join(textStyles, style)}
        ref={textRef}
      >
        { children }
      </RNText>
    )
  }))
}
