import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { Text } from '../typography/text'
import { Divider } from '../divider/divider'

export const CardHeader = ({ header, theme, numberOfLines, styles }) => {

  if(!header || React.isValidElement(header))
    return header || null
  
  return (
    <View>
      <Text numberOfLines={ numberOfLines } style={ styles.header } >
        { header }
      </Text>
      <Divider style={ styles.divider } />
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
    <View {...attributes} style={ styles.container } >
      <View style={ styles.wrapper } >
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
      <Divider style={ styles.divider } />
      <Text numberOfLines={ numberOfLines } style={ styles.footer } >
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