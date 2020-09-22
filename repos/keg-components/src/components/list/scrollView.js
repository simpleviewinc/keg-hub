import React from 'react'
import { ScrollView as RNScrollView } from 'react-native'


/**
 * ScrollView
 * @summary Wrapper around React-Native scroll view export
 *
 * @param {Object} props - see React Native ScrollView.propTypes
 *
 */
export const ScrollView = props => {
  return <RNScrollView {...props} />
}

ScrollView.propTypes = {
  ...RNScrollView.propTypes,
}
