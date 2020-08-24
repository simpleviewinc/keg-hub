import React from 'react'
import { Example } from '../../components'
import { useTheme } from '@svkeg/re-theme'

const codeText = `
  {
    button: {
      main: {
        $xsmall: {
          backgroundColor: 'orange'
        },
        $large: {
          backgroundColor: 'blue'
        }
      }
    }
  }
`

const description = (
  <p>
    Add size keys to your theme object to defined styles that only activate on certain viewport dimensions. 
    <br />
    By default, Retheme uses the following size keys and values, which should work for most cross-platform apps:
    <br />
    <code>
      $xsmall: 1
      <br />
      $small: 320
      <br />
      $medium: 768
      <br />
      $large: 1024
      <br />
      $xlarge: 1366
      <br />
    </code>

    <br />
    But you can use the function <code>setSizes</code> to update these to be whatever you want.
  </p>
)

const ResizingExample = () => {
  const theme = useTheme()
  const styles = theme.components.sizeExample.main
  console.log({styles})
  return (
    <div style={styles}>
      Change the width of the screen to see the styles change dynamically!
    </div>
  )
}


export const UseThemeViewportExample = ({ toggled }) => {
  return (
    <Example
      isToggled={toggled}
      headerText={'Dynamic theme based on viewport size'}
      description={description}
      codeText={codeText}
      component={ <ResizingExample /> }
    />
  )
}