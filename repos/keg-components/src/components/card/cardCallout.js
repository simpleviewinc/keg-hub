import React from 'react'
import { View } from 'KegView'
import { get, noPropObj } from '@keg-hub/jsutils'
import { Text } from '../typography/text'
import { useClassList } from 'KegClassList'

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
