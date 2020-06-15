import React from 'react'
import { useTheme } from '@simpleviewinc/re-theme'
import { View } from 'KegView'
import { Text } from '../typography/text'
import { get } from 'jsutils'

export const CardMediaTitle = ({ subtitle, title, styles }) => {
  const theme = useTheme()
  return (
    <View
      style={theme.join(
        get(theme, [ 'components', 'card', 'overlay' ]),
        styles.overlay
      )}
    >
      { title && (
        <Text
          style={theme.join(
            get(theme, [ 'components', 'card', 'featured', 'title' ]),
            styles.title
          )}
        >
          { title }
        </Text>
      ) }
      { subtitle && (
        <Text
          style={theme.join(
            get(theme, [ 'components', 'card', 'featured', 'subtitle' ]),
            styles.subtitle
          )}
        >
          { subtitle }
        </Text>
      ) }
    </View>
  )
}
