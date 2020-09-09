import React from 'react'
import PropTypes from 'prop-types'
import { useThemePath, useMediaProps } from 'KegHooks'

// Card children imports
import { CardContent } from './cardContent'
import { CardContainer } from './cardContainer'
import { CardSection } from './cardSection'
import { CardMedia } from './cardMedia'

export const Card = ({ styles, ...props }) => {
  const {
    contentTitle,
    children,
    className,
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

  const cardStyles = useThemePath(themePath || `card.${type}`, styles)
  const mediaProps = useMediaProps({ Media, image, video, styles: cardStyles })
  const hasMedia = Boolean(Media || mediaProps)
  const hasContent = Boolean(children || title || subtitle)

  return (
    <CardContainer
      className={className}
      attributes={attributes}
      styles={cardStyles}
    >
      { Header && (
        <CardSection
          Section={Header}
          type='header'
          numberOfLines={headerLines}
          styles={cardStyles.header}
          showBorder={!hasMedia}
        />
      ) }

      { hasMedia && (
        <CardMedia
          mediaProps={mediaProps}
          styles={cardStyles.media}
          hasHeader={Boolean(Header)}
        />
      ) }

      { hasContent && (
        <CardContent
          title={title}
          subtitle={subtitle}
          styles={cardStyles.content}
          children={children}
        />
      ) }

      { Footer && (
        <CardSection
          Section={Footer}
          type='footer'
          numberOfLines={footerLines}
          styles={cardStyles.footer}
          showBorder={hasContent}
        />
      ) }
    </CardContainer>
  )
}

Card.Body = CardContent
Card.Container = CardContainer
Card.Header = CardSection
Card.Footer = CardSection
Card.Media = CardMedia

Card.propTypes = {
  contentTitle: PropTypes.string,
  Footer: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  footerLines: PropTypes.number,
  Header: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
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
