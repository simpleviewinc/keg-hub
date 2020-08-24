import React from 'react'
import { View, H5, Text, Row } from 'SVComponents'
import { useStylesCallback } from '@svkeg/re-theme'
import { get } from '@svkeg/jsutils'
import { isNative, isStandalonePWA, isIOSWeb } from 'SVUtils'

const buildStyles = (theme, styles) => {
  const margin = get(theme, 'margin.size')
  return {
    main: {
      flexDirection: 'column',
      margin: margin,
    },
    title: {
      margin: margin,
      alignItems: 'center',
      textAlign: 'center',
    },
    row: {
      margin: margin,
    },
  }
}

export const HomeContainer = props => {
  const homeStyles = useStylesCallback(buildStyles)

  return (
    <>
      <View style={homeStyles.main}>
        <H5 style={homeStyles.title}>Welcome to the Keg</H5>
        <Row style={homeStyles.row}>
          <Text>Is Native: { isNative().toString() }</Text>
        </Row>
        <Row style={homeStyles.row}>
          <Text>Is IOS Web: { isIOSWeb().toString() }</Text>
        </Row>
        <Row style={homeStyles.row}>
          <Text>Is Standalone PWA: { isStandalonePWA().toString() }</Text>
        </Row>
      </View>
    </>
  )
}
