import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { get, deepMerge, isStr } from 'jsutils'
import { CardImage } from './cardImage'
import { CardContainer, CardFooter, CardHeader } from './cardContent'
import { View } from '../'

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
    header,
    title,
    subtitle,
    headerNumberOfLines,
    footerNumberOfLines,
    image,
    styleId,
    ...attributes
  } = props

  const hasImage = Boolean(image)
  const imgProps = hasImage && getImgProps(image, styles)
  const cardStyleId = styleId || `keg-card`
  
  return (
    <CardContainer
      theme={ theme }
      attributes={ attributes }
      styles={{
        container: styles.container,
        wrapper: styles.wrapper,
        styleId: cardStyleId,
      }}
    >

      <CardHeader
        header={ header }
        theme={ theme }
        numberOfLines={ headerNumberOfLines }
        styles={{ 
          header: styles.header,
          divider: styles.divider,
          styleId: cardStyleId,
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
            loading: styles.loading,
            styleId: cardStyleId,
          }}
        />
      )}

      <View
        style={ theme.get(
          `${cardStyleId}-card-children`,
          'components.card.children',
          styles.children
        )}
      >
        { children }
      </View>
      
      { footer && (
        <CardFooter
          footer={ footer }
          theme={ theme }
          numberOfLines={ footerNumberOfLines }
          styles={{ 
            footer: styles.footer,
            divider: styles.divider,
            styleId: cardStyleId,
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
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  styleId: PropTypes.string,
  styles: PropTypes.object,
}
