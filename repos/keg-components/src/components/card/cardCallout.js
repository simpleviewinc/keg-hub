import React from 'react'
import { View } from 'KegView'
import { Text } from '../typography/text'
import { get } from '@keg-hub/jsutils'
import { noPropObj } from '../../utils/helpers/noop'
import { useThemePath } from '../../hooks'
import { useClassList } from '../../hooks/useClassList'

export const CardCallout = ({
  className,
  subtitle,
  title,
  styles = noPropObj,
}) => {
  const themeStyles = useThemePath(`components.card`)

  return (
    <View
      className={useClassList('keg-card-callout', className)}
      style={[ themeStyles.overlay, styles.overlay ]}
    >
      { title && (
        <Text
          className='keg-card-title'
          style={[ get(themeStyles, [ 'featured', 'title' ]), styles.title ]}
        >
          { title }
        </Text>
      ) }
      { subtitle && (
        <Text
          className='keg-card-subtitle'
          style={[ get(themeStyles, [ 'featured', 'subtitle' ]), styles.subtitle ]}
        >
          { subtitle }
        </Text>
      ) }
    </View>
  )
}
