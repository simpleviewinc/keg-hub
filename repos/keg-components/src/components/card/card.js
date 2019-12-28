import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import { CardImage } from './cardImage'
import { Divider, View, Text } from '../'

const CardHeader = ({ header, theme, hasImage, numberOfLines, styles }) => {

  if(!header || React.isValidElement(header))
    return header || null
  
  return (
    <View>
      <Text
        testID="cardTitle"
        numberOfLines={ numberOfLines }
        style={theme.join(
          get(theme, [ 'components', 'card', 'header' ]),
          hasImage && get(theme, [ 'components', 'card', 'image', 'title' ]),
          styles.header,
        )}
      >
        { header }
      </Text>

      { !hasImage && (
        <Divider
          style={theme.join(
            get(theme, [ 'components', 'card', 'divider' ]),
            styles.divider
          )}
        />
      )}
    </View>
  )
}

CardHeader.propTypes = {
  header: PropTypes.string,
  hasImage: PropTypes.bool,
  numberOfLines: PropTypes.number,
  styles: PropTypes.object,
  theme: PropTypes.object,
}

const CardContainer = ({ attributes, children, hasImage, styles, theme }) => {
  return (
    <View
      {...attributes}
      style={theme.join(
        get(theme, [ 'components', 'card', 'container' ]),
        hasImage && { padding: 0 },
        styles.container,
      )}
    >
      <View
        style={theme.join(
          get(theme, [ 'components', 'card', 'wrapper' ]),
          styles.wrapper
        )}
      >
        { children }
      </View>
    </View>
  )
}

CardContainer.propTypes = {
  attributes: PropTypes.object,
  hasImage: PropTypes.bool,
  styles: PropTypes.object,
  theme: PropTypes.object,
}

export const Card = ({ styles, ...props}) => {

  const theme = useTheme()
  styles = styles || {}

  const {
    children,
    header,
    title,
    subtitle,
    headerNumberOfLines,
    image,
    imageProps,
    ...attributes
  } = props

  const hasImage = Boolean(image)

  return (
    <CardContainer
      theme={ theme }
      hasImage={ hasImage }
      attributes={ attributes }
      styles={{
        container: styles.container,
        wrapper: styles.wrapper
      }}
    >

      <CardHeader
        header={ header }
        theme={ theme }
        hasImage={ hasImage }
        numberOfLines={ headerNumberOfLines }
        styles={{ 
          header: styles.header,
          divider: styles.divider
        }}
      />

      { !hasImage ? children : (
        <CardImage
          title={ title }
          subtitle={ subtitle }
          imageProps={ imageProps }
          image={ image }
          children={ children }
          styles={{
            image: styles.image,
            overlay: styles.overlay,
            wrapper: styles.imageWrapper,
            title: styles.title,
            subtitle: styles.subtitle,
            childrenWrap: styles.wrapper
          }}
        />
      )}

    </CardContainer>
  )
}

Card.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerNumberOfLines: PropTypes.number,
  image: PropTypes.object,
  imageProps: PropTypes.object,
  styles: PropTypes.object,
}
