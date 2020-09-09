import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { noPropObj } from '../../utils/helpers/noop'
import { CardCallout } from './cardCallout'

export const CardContent = ({
  children,
  styles = noPropObj,
  subtitle,
  title,
}) => {
  return (
    <View
      className='keg-card-content'
      style={styles.main}
    >
      { (title || subtitle) && (
        <CardCallout
          className='keg-card-content-callout'
          styles={styles}
          subtitle={subtitle}
          title={title}
        />
      ) }
      { children }
    </View>
  )
}

CardContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
    PropTypes.func,
    PropTypes.element,
  ]),
  style: PropTypes.object,
}
