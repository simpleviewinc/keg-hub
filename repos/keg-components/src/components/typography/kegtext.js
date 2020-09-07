import React, { useMemo } from 'react'
import { withTheme } from '@keg-hub/re-theme'
import { Text as RNText } from 'react-native'
import { useClassName } from '../../hooks/useClassName'

const ellipsisProps = {
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}
const headings = [ '1', '2', '3', '4', '5', '6' ]

export const KegText = element => {
  return withTheme(
    React.forwardRef((props, ref) => {
      const {
        accessibilityRole,
        children,
        className,
        dataSet,
        style,
        theme,
        ellipsis,
        ...attrs
      } = props

      const textRef = useClassName(className, dataSet, ref)

      const a11y = useMemo(() => {
        const type = accessibilityRole
          ? accessibilityRole
          : element.indexOf('h') === 0 && headings.includes(element[2])
            ? 'header'
            : element

        return {
          accessibilityRole: accessibilityRole || type,
          ...(type === 'header' && { ['aria-level']: element[2] }),
        }
      }, [ element, accessibilityRole ])

      // Get the styles for the text element
      const textStyles = theme.get(
        'typography.font.family',
        'typography.default',
        element && `typography.${element}`
      )

      return (
        <RNText
          {...attrs}
          {...a11y}
          {...(ellipsis && ellipsisProps)}
          style={[ textStyles, style ]}
          ref={textRef}
        >
          { children }
        </RNText>
      )
    })
  )
}
