import React from 'react'
import { Example } from '../../components'
import { UseThemeButton } from './useThemeButton'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UseThemeButtonTxt from '!!raw-loader!./useThemeButton.js'

const description = (
  <p>
    Import the <b>useTheme</b> <a href="https://reactjs.org/docs/hooks-intro.html" >hook</a> to get access to the app theme. Uses the <a href="https://reactjs.org/docs/context.html" >React Context API</a> under the hood. Works identically to the <b>withTheme HOC</b> but as a hook variant.
  </p>
)
export const UseThemeExample = ({ toggled }) => (<Example
  isToggled={ toggled }
  headerText={ 'useTheme' }
  description={ description }
  component={ <UseThemeButton>useTheme Button</UseThemeButton> }
  codeText={ UseThemeButtonTxt }
/>)