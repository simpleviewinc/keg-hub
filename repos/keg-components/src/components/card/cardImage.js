import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import { Image, View, Text } from '../'

const CardImageTitle = ({ subtitle, title, styles, theme }) => {
  return (
    <View style={ theme.join(
      get(theme, [ 'components', 'card', 'overlay' ]),
      styles.overlay
    )}>
      {title && (
        <Text
          style={theme.join(
            get(theme, [ 'components', 'card', 'featured', 'title' ]),
            styles.title
          )}
        >
          { title }
        </Text>
      )}
      {subtitle && (
        <Text
          style={theme.join(
            get(theme, [ 'components', 'card', 'featured', 'subtitle' ]),
            styles.subtitle
          )}
        >
          { subtitle }
        </Text>
      )}
    </View>
  )
}

export const CardImage = ({ children, image, imageProps, subtitle, styles, title }) => {
  const theme = useTheme()
  
  return (
    <View style={ theme.join(
      get(theme, [ 'components', 'card', 'image', 'wrapper' ]),
      styles.wrapper
    )}>
      <Image
        style={ theme.join(
          { width: null, height: 150 },
          get(theme, [ 'components', 'card', 'image', 'image' ]),
          styles.image
        )}
        source={ image }
        {...imageProps}
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

      <View style={theme.join({ padding: 10 }, styles.childrenWrap )} >
        { children }
      </View>

    </View>
  )
}

CardImage.propTypes = {
  imageProps: PropTypes.object
}