import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 'KegReTheme'
import { deepMerge, isStr, get } from 'jsutils'
import { CardImage } from './cardImage'
import { CardContainer, CardFooter, CardHeader } from './cardContent'
import { View } from 'KegView'

const buildStyles = (styles, styleId, theme) => {
  const cardStyles = {}

  cardStyles.container = theme.join(
    get(theme, [ 'components', 'card', 'container' ]),
    styles.container
  )

  cardStyles.wrapper = theme.join(
    get(theme, [ 'components', 'card', 'wrapper' ]),
    styles.wrapper
  )

  cardStyles.header = theme.join(
    theme.get(
      `${styleId}-header`,
      'typography.h5',
      'components.card.header',
    ),
    styles.header
  )

  cardStyles.footer = theme.join(
    get(theme, [ 'components', 'card', 'footer']),
    styles.footer
  )

  cardStyles.divider = theme.join(
    get(theme, [ 'components', 'card', 'divider' ]),
    styles.divider
  )

  cardStyles.children = theme.join(
    get(theme, ['components', 'card', 'children']),
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
    styleId,
    subtitle,
    title,
    ...attributes
  } = props

  const hasImage = Boolean(image)
  const imgProps = hasImage && getImgProps(image, styles)
  const cardStyleId = styleId || `keg-card`
  const cardStyles = buildStyles(styles, cardStyleId, theme)
  
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
  styleId: PropTypes.string,
  styles: PropTypes.object,
}
