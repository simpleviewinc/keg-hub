import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { deepMerge, isStr, get } from 'jsutils'
import { CardImage } from './cardImage'
import { CardContainer, CardFooter, CardHeader } from './cardContent'
import { View } from 'KegView'

const buildStyles = (styles, theme) => {
  const cardStyles = {}

  cardStyles.container = theme.join(
    get(theme, [ 'card', 'container' ]),
    styles.container
  )

  cardStyles.wrapper = theme.join(
    get(theme, [ 'card', 'wrapper' ]),
    styles.wrapper
  )

  cardStyles.header = theme.join(
    theme.get(
      'typography.h5',
      'card.header',
    ),
    styles.header
  )

  cardStyles.footer = theme.join(
    get(theme, [ 'card', 'footer']),
    styles.footer
  )

  cardStyles.divider = theme.join(
    get(theme, [ 'card', 'divider' ]),
    styles.divider
  )

  cardStyles.children = theme.join(
    get(theme, [ 'card', 'children' ]),
    cardStyles.children
  )

  return cardStyles

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
    footer,
    footerLines,
    header,
    headerLines,
    image,
    subtitle,
    title,
    ...attributes
  } = props

  const hasImage = Boolean(image)
  const imgProps = hasImage && getImgProps(image, styles)
  const cardStyles = buildStyles(styles, theme)
  
  return (
    <CardContainer
      theme={ theme }
      attributes={ attributes }
      styles={ cardStyles }
    >

      <CardHeader
        header={ header }
        theme={ theme }
        numberOfLines={ headerLines }
        styles={ cardStyles }
      />

      { hasImage && (
        <CardImage
          title={ title }
          subtitle={ subtitle }
          image={ imgProps }
          children={ children }
          styles={{
            children: cardStyles.children,
            image: imgProps.style,
            loading: styles.loading,
            overlay: styles.overlay,
            subtitle: styles.subtitle,
            title: styles.title,
            wrapper: styles.imageWrapper,
          }}
        />
      )}

      <View style={ cardStyles.children } >
        { children }
      </View>
      
      { footer && (
        <CardFooter
          footer={ footer }
          theme={ theme }
          numberOfLines={ footerLines }
          styles={ cardStyles }
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
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  styles: PropTypes.object,
}
