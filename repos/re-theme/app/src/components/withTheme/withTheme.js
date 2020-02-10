import React from 'react'
import { Example } from '../../components'
import { WithThemeButton } from './withThemeButton'

// eslint-disable-next-line import/no-webpack-loader-syntax
import WithThemeButtonTxt from '!!raw-loader!./withThemeButton.js'

const description = (
  <p>
    Wrap your components in the <b>withTheme</b> <a href="https://reactjs.org/docs/higher-order-components.html" >HOC (Higher Order Component)</a> to add the app theme to the components props. Uses the <a href="https://reactjs.org/docs/context.html" >React Context API</a> under the hood.
  </p>
)

export const WithThemeExample =({ toggled }) => (<Example
  isToggled={ toggled }
  description={ description }
  headerText={ 'withTheme' }
  component={ <WithThemeButton>withTheme Button</WithThemeButton> }
  codeText={ WithThemeButtonTxt }
/>)