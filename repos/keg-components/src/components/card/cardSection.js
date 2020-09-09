import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { Text } from '../typography/text'
import { renderFromType } from '../../utils'
import { get } from '@keg-hub/jsutils'

const SectionWrap = ({ children, numberOfLines, showBorder, styles, type }) => {
  type = type || 'section'
  return (
    <Text
      className={`keg-${type}-text`}
      numberOfLines={numberOfLines}
      style={[
        get(styles, `text`),
        showBorder === false && get(styles, `noBorder.text`),
      ]}
    >
      { children }
    </Text>
  )
}

export const CardSection = ({ Section, ...props }) => {
  const type = props.type || 'section'
  return (
    Section && (
      <View
        className={`keg-card-${type}`}
        style={[
          get(props, `styles.main`),
          props.showBorder === false && get(props, `styles.noBorder.main`),
        ]}
      >
        { renderFromType(Section, props, SectionWrap) }
      </View>
    )
  )
}

CardSection.propTypes = {
  Section: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.array,
    PropTypes.func,
  ]),
  numberOfLines: PropTypes.number,
  styles: PropTypes.object,
  type: PropTypes.string,
  numberOfLines: PropTypes.number,
}
