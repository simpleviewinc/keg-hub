import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'

export const CardContainer = ({ attributes = {}, children, styles = {} }) => {
  return (
    <View
      {...attributes}
      style={styles.main}
    >
      <View style={styles.container}>{ children }</View>
    </View>
  )
}

CardContainer.propTypes = {
  attributes: PropTypes.object,
  styles: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
}
