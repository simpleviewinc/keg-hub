import React from 'react'
import PropTypes from 'prop-types'
import { useThemePath, useMediaProps } from 'KegHooks'

// Card children imports
import { CardBody } from './cardBody'
import { CardContainer } from './cardContainer'
import { CardFooter } from './cardFooter'
import { CardHeader } from './cardHeader'
import { CardMedia } from './cardMedia'

export const Card = ({ styles, ...props }) => {
  styles = styles || {}

  const {
    children,
    Footer,
    footerLines,
    Header,
    headerLines,
    image,
    Media,
    subtitle,
    themePath,
    title,
    type = 'default',
    video,
    ...attributes
  } = props

  const [cardStyles] = useThemePath(themePath || `card.${type}`, styles)
  const mediaProps = useMediaProps({ Media, image, video, styles: cardStyles })

  return (
    <CardContainer
      attributes={attributes}
      styles={cardStyles}
    >
      { Header && (
        <CardHeader
          Header={Header}
          numberOfLines={headerLines}
          styles={cardStyles}
        />
      ) }

      { (Media || mediaProps) && (
        <CardMedia
          title={title}
          subtitle={subtitle}
          mediaProps={mediaProps}
          styles={cardStyles}
        />
      ) }

      { children && <CardBody
        style={cardStyles.body}
        children={children}
      /> }

      { Footer && (
        <CardFooter
          footer={Footer}
          numberOfLines={footerLines}
          styles={cardStyles}
        />
      ) }
    </CardContainer>
  )
}

Card.Body = CardBody
Card.Container = CardContainer
Card.Header = CardHeader
Card.Footer = CardFooter
Card.Media = CardMedia

Card.propTypes = {
  footerLines: PropTypes.number,
  header: PropTypes.string,
  headerLines: PropTypes.number,
  Media: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  styles: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}
