import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { get, deepMerge, isStr } from 'jsutils'
import { CardImage } from './cardImage'
import { Divider, View, Text } from '../'

const CardHeader = ({ header, theme, numberOfLines, styles }) => {

  if(!header || React.isValidElement(header))
    return header || null
  
  return (
    <View>
      <Text
        numberOfLines={ numberOfLines }
        style={theme.join(
          get(theme, [ 'components', 'card', 'header' ]),
          styles.header,
        )}
      >
        { header }
      </Text>

      <Divider
        style={theme.join(
          get(theme, [ 'components', 'card', 'divider' ]),
          styles.divider
        )}
      />
    </View>
  )
}

CardHeader.propTypes = {
  header: PropTypes.string,
  numberOfLines: PropTypes.number,
  styles: PropTypes.object,
  theme: PropTypes.object,
}

const CardContainer = ({ attributes, children, styles, theme }) => {
  return (
    <View
      {...attributes}
      style={theme.join(
        get(theme, [ 'components', 'card', 'container' ]),
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
  styles: PropTypes.object,
  theme: PropTypes.object,
}

const getImgProps = (image, styles) => {
  return isStr(image)
    ? { src: image, style: styles.image }
    : { ...image, style: { ...deepMerge(image.style, styles.image) } }
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
    ...attributes
  } = props

  const hasImage = Boolean(image)
  const imgProps = hasImage && getImgProps(image, styles)
  
  return (
    <CardContainer
      theme={ theme }
      attributes={ attributes }
      styles={{
        container: styles.container,
        wrapper: styles.wrapper
      }}
    >

      <CardHeader
        header={ header }
        theme={ theme }
        numberOfLines={ headerNumberOfLines }
        styles={{ 
          header: styles.header,
          divider: styles.divider
        }}
      />

      { hasImage && (
        <CardImage
          title={ title }
          subtitle={ subtitle }
          image={ imgProps }
          children={ children }
          styles={{
            image: imgProps.style,
            overlay: styles.overlay,
            wrapper: styles.imageWrapper,
            title: styles.title,
            subtitle: styles.subtitle,
            loading: styles.loading
          }}
        />
      )}

      <View style={ styles.children } >
        { children }
      </View>

    </CardContainer>
  )
}

Card.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerNumberOfLines: PropTypes.number,
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  styles: PropTypes.object,
}
