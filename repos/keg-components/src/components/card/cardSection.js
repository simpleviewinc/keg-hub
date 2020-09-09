import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { Text } from '../typography/text'
import { renderFromType } from '../../utils'
import { get } from '@keg-hub/jsutils'

const noBorder = {
  borderBottomWidth: 0,
  borderTopWidth: 0
}
const SectionWrap = ({ children, numberOfLines, styles, type }) => {
  type = type || 'section'
  return (
    <Text
      className={`keg-${type}-text`}
      style={get(styles, `text`)}
      numberOfLines={numberOfLines}
    >
      { children }
    </Text>
  )
}

export const CardSection = ({ Section, showBorder, ...props }) => {
  const type = props.type || 'section'
  return (
    Section && (
      <View
        className={`keg-card-${type}`}
        style={[
          get(props, `styles.main`),
          showBorder === false && noBorder
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
