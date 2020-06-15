import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'

export const CardBody = ({ style, children }) => {
  return <View style={style}>{ children }</View>
}

CardBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  style: PropTypes.object,
}
