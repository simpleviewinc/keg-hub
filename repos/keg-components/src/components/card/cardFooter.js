import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { Text } from '../typography/text'
import { Divider } from '../divider/divider'
import { renderFromType } from '../../utils'

const FooterWrap = ({ numberOfLines, styles, children }) => {
  const textProps = { style: get(styles, 'footer.text') }
  numberOfLines && (textProps.numberOfLines = numberOfLines)

  return (
    <View style={get(styles, 'footer.container')}>
      <Text {...textProps}>{ children }</Text>
      <Divider
        style={deepMerge(styles.divider, get(styles, 'footer.divider'))}
      />
    </View>
  )
}

export const CardFooter = ({ Footer, ...props }) => {
  return Footer ? renderFromType(Footer, props, FooterWrap) : null
}

CardFooter.propTypes = {
  header: PropTypes.string,
  numberOfLines: PropTypes.number,
  styles: PropTypes.object,
}
