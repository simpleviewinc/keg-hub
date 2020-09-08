import React from 'react'
import { View } from 'KegView'
import { Text } from '../typography/text'
import { get } from '@keg-hub/jsutils'
import { noPropObj } from '../../utils/helpers/noop'
import { useThemePath } from '../../hooks'
import { useClassList } from '../../hooks/useClassList'

export const CardMediaTitle = ({ classNames=noPropObj, subtitle, title, styles=noPropObj }) => {
  const themeStyles = useThemePath(`components.card`)

  return (
    <View
      className={useClassList(classNames.main, ['keg-card-media-title-main'])}
      style={[ themeStyles.overlay, styles.overlay ]}
    >
      { title && (
        <Text
          className={useClassList(classNames.content.title, ['keg-card-media-title'])}
          style={[
            get(themeStyles, [ 'featured', 'title' ]),
            styles.title
          ]}
        >
          { title }
        </Text>
      ) }
      { subtitle && (
        <Text
          className={useClassList(classNames.content.subtitle, ['keg-card-media-subtitle'])}
          style={[
            get(themeStyles, [ 'featured', 'subtitle' ]),
            styles.subtitle
          ]}
        >
          { subtitle }
        </Text>
      ) }
    </View>
  )
}
