import React, { useMemo } from 'react'
import { useClassName } from 'KegClassName'
import { useTheme } from '@keg-hub/re-theme'
import { isArr, isStr } from '@keg-hub/jsutils'
import { Text as RNText } from 'react-native'
import { useStyleTag } from '@keg-hub/re-theme/styleInjector'

const ellipsisProps = {
  ellipsizeMode: 'tail',
  numberOfLines: 1,
}
const headings = [ '1', '2', '3', '4', '5', '6' ]

export const KegText = element => {
  return React.forwardRef((props, ref) => {
    const theme = useTheme()

    const {
      accessibilityRole,
      children,
      className,
      style,
      ellipsis,
      ...attrs
    } = props

    const textStyles = useMemo(() => {
      // Get the styles for the text element
      return theme.get(
        'typography.font.family',
        'typography.default',
        element && `typography.${element}`
      )
    }, [ theme, element ])

    const classList = useStyleTag(textStyles)
    isArr(className)
      ? className.push(classList.pop())
      : isStr(className) && (className += classList.pop())

    const classRef = useClassName(`keg-${element}`, className, ref)

    const a11y = useMemo(() => {
      const type = accessibilityRole
        ? accessibilityRole
        : element.indexOf('h') === 0 && headings.includes(element[1])
          ? 'header'
          : element

      return {
        accessibilityRole: accessibilityRole || type,
        ...(type === 'header' && { ['aria-level']: element[1] }),
      }
    }, [ element, accessibilityRole ])

    return (
      <RNText
        {...attrs}
        {...a11y}
        {...(ellipsis && ellipsisProps)}
        ref={classRef}
      >
        { children }
      </RNText>
    )
  })
}