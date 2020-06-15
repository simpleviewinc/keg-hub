import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { Text } from '../typography/text'
import { Divider } from '../divider/divider'
import { renderFromType } from '../../utils'
import { get, deepMerge } from 'jsutils'

const HeaderWrap = ({ numberOfLines, styles, children }) => {
  const textProps = { style: get(styles, 'header.text') }
  numberOfLines && (textProps.numberOfLines = numberOfLines)

  return (
    <View style={get(styles, 'header.container')}>
      <Text {...textProps}>{ children }</Text>
      <Divider
        style={deepMerge(styles.divider, get(styles, 'header.divider'))}
      />
    </View>
  )
}

export const CardHeader = ({ Header, ...props }) => {
  return Header ? renderFromType(Header, props, HeaderWrap) : null
}

CardHeader.propTypes = {
  header: PropTypes.string,
  numberOfLines: PropTypes.number,
  styles: PropTypes.object,
}
