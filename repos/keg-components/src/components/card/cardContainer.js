import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { useClassList } from 'KegClassList'
import { noOpObj, noPropObj } from '@keg-hub/jsutils'

export const CardContainer = ({
  className,
  attributes = noOpObj,
  children,
  styles = noPropObj,
}) => {
  return (
    <View
      className={useClassList('keg-card', className)}
      {...attributes}
      style={styles.main}
    >
      <View
        className='keg-card-container'
        style={styles.container}
      >
        { children }
      </View>
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
