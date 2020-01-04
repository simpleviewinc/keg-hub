import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import { Image, View, Text } from '../'

const CardImageTitle = ({ subtitle, title, styles, theme }) => {
  return (
    <View style={ theme.get(
      `${styles.styleId}-overlay`,
      [ 'components', 'card', 'overlay' ],
      styles.overlay
    )}>
      {title && (
        <Text
          style={theme.get(
            `${styles.styleId}-featured-title`,
            [ 'components', 'card', 'featured', 'title' ],
            styles.title
          )}
        >
          { title }
        </Text>
      )}
      {subtitle && (
        <Text
          style={theme.get(
            `${styles.styleId}-featured-subtitle`,
            [ 'components', 'card', 'featured', 'subtitle' ],
            styles.subtitle
          )}
        >
          { subtitle }
        </Text>
      )}
    </View>
  )
}

export const CardImage = ({ image, subtitle, styles, title }) => {
  const theme = useTheme()

  return (
    <Image
      { ...image }
      styles={{ loading: styles.loading, wrapper: styles.wrapper }}
      style={ theme.get(
        `${styles.styleId}-image`,
        [ 'components', 'card', 'image', 'image' ],
        styles.image
      )}
    >
      {(title || subtitle) && (
        <CardImageTitle
          subtitle={ subtitle }
          title={ title }
          styles={ styles }
          theme={ theme }
        />
      )}
    </Image>
  )
}

CardImage.propTypes = {
  image: PropTypes.object,
  styles: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}