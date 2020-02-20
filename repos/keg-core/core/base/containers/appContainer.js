import React from 'react'
import { View, H5, Button, Text, Row } from 'SVComponents'
import { useTheme } from 're-theme'
import { get }  from 'jsutils'
import { isNative, isStandalonePWA, isIOSWeb } from 'SVUtils'


export const AppContainer = props => {

  const theme = useTheme()
  const margin = { margin: get(theme, 'margin.size') }

  return (
    <View style={{ flexDirection: 'column', ...margin }} >
      <H5 style={ { ...margin, alignItems: 'center', textAlign: 'center' } } >
        Welcome to the Keg
      </H5>
      <Button
        themePath="button.contained.primary"
        styles={{ main: margin }}
      >
        Click Me
      </Button>
      <Row style={ margin } >
        <Text>
          Is Native: { isNative().toString() }
        </Text>
      </Row>
      <Row style={ margin } >
        <Text>
          Is IOS Web: { isIOSWeb().toString() }
        </Text>
      </Row>
      <Row style={ margin } >
        <Text>
          Is Standalone PWA: { isStandalonePWA().toString() }
        </Text>
      </Row>
    </View>
  )
}
