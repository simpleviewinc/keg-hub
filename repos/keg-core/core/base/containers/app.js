import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withTheme } from 're-theme'
import { wordCaps } from 'jsutils'
import { Platform } from 'react-native'
import { Button } from 'SVComponents/button'
import { Image } from 'SVComponents/image'
import { Loading } from 'SVComponents/loading'
import {
  Picker,
  ScrollView,
  Text,
  View,
} from 'SVComponents/native'
import { tapSwitcherAction } from 'SVActions'
import { getOrThrow } from 'SVUtils/helpers/method/getOrThrow'
import tapList from 'SVCore/scripts/js/tapList'

const logoStyles = {
  height: 250,
  width: 250,
  marginBottom: 16,
  marginTop: 64,
  padding: 10,
}
const buildIntro = (tap, theme) => {
  const headerText = theme.join(
    getOrThrow(theme, 'text.h6'),
    getOrThrow(theme, 'margin.bottom'),
    getOrThrow(theme, 'text.align.center')
  )

  const instructText = theme.join(
    getOrThrow(theme, 'text.align.center'),
    getOrThrow(theme, 'helpers.color')(
      getOrThrow(theme, 'colors.secondary.dark')
    )
  )

  const containerStyle = getOrThrow(theme, [ 'display', 'content', 'center' ])

  return (
    <View style={containerStyle}>
      <Image
        source={require('SVAssets/client_logo.jpg')}
        style={[ logoStyles ]}
      />
      <View>
        <Text style={headerText}>Simpleview Mobile Keg</Text>
      </View>

      { Platform.OS === 'ios' ? (
        <Text style={instructText}>
          Press Cmd+R to reload,{ '\n' }
          Cmd+D or shake for dev menu
        </Text>
      ) : (
        <Text style={instructText}>
          Double tap R on your keyboard to reload,{ '\n' }
          Cmd+M or shake for dev menu
        </Text>
      ) }
    </View>
  )
}
const onSelectTap = (setActiveTap, tapName) => {
  setActiveTap(tapName)
}
const buildPicker = (tap, setActiveTap) => {
  return (
    <Picker
      selectedValue={tap || ''}
      onValueChange={onSelectTap.bind(this, setActiveTap)}
    >
      <Picker.Item key={'select-tap'} label={'Select Tap'} value={''} />

      { Object.keys(tapList).map(option => {
        return (
          <Picker.Item key={option} label={wordCaps(option)} value={option} />
        )
      }) }
    </Picker>
  )
}
const buildLoadButton = (tap, setActiveTap, theme) => {
  const hasActiveTap = Boolean(tap)
  const BtnText = hasActiveTap ? `Load ${wordCaps(tap)}` : 'Select Tap'

  return (
    <Button
      style={getOrThrow(theme, 'display.noRadius')}
      onPress={() => tapSwitcherAction(tap)}
      disabled={!hasActiveTap}
    >
      <Text
        style={theme.join(
          getOrThrow(theme, 'helpers.color')(theme.colors.white),
          getOrThrow(theme, 'helpers.bold')()
        )}
      >
        { BtnText }
      </Text>
    </Button>
  )
}
// TODO: Build a loading component, and replace this
const buildLoading = props => {
  return <Loading style={{}} />
}
const buildContainer = props => {
  const { theme } = props
  const [ activeTap, setActiveTap ] = useState(null)

  return (
    <ScrollView contentInsetAdjustmentBehavior='automatic'>
      <Text>{ `Theme Size: ${theme.RTMeta.key}` }</Text>
      <Text>{ `Becomes Active: ${theme.RTMeta.size}` }</Text>
      <Text>Window Width: { window.innerWidth }</Text>
      <View style={getOrThrow(theme, 'margin.all')}>
        { buildIntro(activeTap, theme) }
        { buildPicker(activeTap, setActiveTap, theme) }
        { buildLoadButton(activeTap, setActiveTap, theme) }
      </View>
    </ScrollView>
  )
}

const App = withTheme(props => {
  const { initialized } = props

  return !initialized ? buildLoading(props) : buildContainer(props)
})

export const AppContainer = connect(({ app: { initialized } }) => ({
  initialized,
}))(withTheme(App))
