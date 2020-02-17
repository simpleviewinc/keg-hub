import React from 'react'
import { View, H5, Button, Text } from 'SVComponents'
import { useTheme } from 're-theme'
import { get }  from 'jsutils'

const logoStyles = {
  height: 250,
  width: 250,
  marginBottom: 16,
  marginTop: 64,
  padding: 10,
}

export const AppContainer = props => {

  const theme = useTheme()

  const textStyle = { color: get(theme, 'colors.palette.white01') }
  const buttonStyle = { margin: get(theme, 'margin.size') }

  return (
    <View
      style={theme.join(
        get(theme, 'display.content.center'),
        get(props, [ 'styles', 'container' ]),
      )}
    >
      <H5>
        Welcome to the Keg
      </H5>
      <Button style={ buttonStyle } >
        <Text>
          Keg Component Default Button
        </Text>
      </Button>
      <Button style={ buttonStyle } primary >
        <Text style={ textStyle } >
          Keg Component Primary Button
        </Text>
      </Button>
    </View>
  )
}
