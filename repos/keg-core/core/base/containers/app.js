import React from 'react'
import { View, H5, Image } from 'SVComponents'
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
    </View>
  )
}
