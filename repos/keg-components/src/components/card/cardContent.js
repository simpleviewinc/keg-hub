import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 're-theme'
import { get } from 'jsutils'
import { Divider, View, Text } from '../'

export const CardHeader = ({ header, theme, numberOfLines, styles }) => {

  if(!header || React.isValidElement(header))
    return header || null
  
  return (
    <View>
      <Text
        numberOfLines={ numberOfLines }
        style={theme.get(
          `${styles.styleId}-header`,
          'typeface.h5',
          'components.card.header',
          styles.header,
        )}
      >
        { header }
      </Text>

      <Divider
        style={theme.get(
          `${styles.styleId}-divider`,
          'components.card.divider',
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

export  const CardContainer = ({ attributes, children, styles, theme }) => {
  return (
    <View
      {...attributes}
      style={theme.get(
        `${styles.styleId}-container`,
        'components.card.container',
        styles.container,
      )}
    >
      <View
        style={theme.get(
          `${styles.styleId}-wrapper`,
          'components.card.wrapper',
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

export const CardFooter = ({ footer, theme, numberOfLines, styles }) => {

  if(!footer || React.isValidElement(footer))
    return footer || null
  
  return (
    <View>
      <Divider
        style={theme.get(
          `${styles.styleId}-divider`,
          'components.card.divider',
          styles.divider
        )}
      />
      <Text
        numberOfLines={ numberOfLines }
        style={theme.get(
          `${styles.styleId}-footer`,
          'components.card.footer',
          styles.footer,
        )}
      >
        { footer }
      </Text>
    </View>
  )
}

CardFooter.propTypes = {
  header: PropTypes.string,
  numberOfLines: PropTypes.number,
  styles: PropTypes.object,
  theme: PropTypes.object,
}