import React from 'react'
import { ReThemeProvider } from '../src/context/reThemeProvider'
import { storyTheme } from './storyTheme'

const splitStyle = {
  margin: '30px 0',
  borderTopWidth: 1,
  borderTopColor: '#dddddd',
  borderTopStyle: 'solid',
}

const wrapStyle = {
  maxWidth: '80vw',
  margin: 'auto',
  marginTop: 30
}

export const Split = props => (
  <View style={{ ...splitStyle, ...props.style }} />
)

export const StoryWrap = props => (
  <ReThemeProvider
    theme={storyTheme}
    merge={false}
  >
    <style>{`
      * {
        font-family: "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
      }
    `}</style>
    <div style={wrapStyle} >
      { props.children }
    </div>
  </ReThemeProvider>
)