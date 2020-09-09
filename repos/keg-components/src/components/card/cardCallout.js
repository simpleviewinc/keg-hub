import React from 'react'
import { View } from 'KegView'
import { get } from '@keg-hub/jsutils'
import { useTheme } from '@keg-hub/re-theme'
import { Text } from '../typography/text'
import { useThemePath } from '../../hooks'
import { noPropObj } from '../../utils/helpers/noop'
import { useClassList } from '../../hooks/useClassList'

export const CardCallout = ({
  className,
  subtitle,
  title,
  styles = noPropObj,
}) => {

  const calloutStyles = get(styles, `callout`)

  return (
    <View
      className={useClassList('keg-card-callout', className)}
      style={calloutStyles.overlay}
    >
      { title && (
        <Text
          className='keg-card-title'
          style={calloutStyles.title}
        >
          { title }
        </Text>
      ) }
      { subtitle && (
        <Text
          className='keg-card-subtitle'
          style={calloutStyles.subtitle}
        >
          { subtitle }
        </Text>
      ) }
    </View>
  )
}
