import React from 'react'
import { Example } from '../../components'

// eslint-disable-next-line import/no-webpack-loader-syntax
import AppReThemeProviderTxt from '!!raw-loader!./appReThemeProvider.js'

const description = (
  <p>
    You must first wrap your app with the <b>ReThemeProvider</b> as shown below. The ReThemeProvider uses the <a href="https://reactjs.org/docs/context.html" >React Context API</a> under the hood. This is <b>required</b> to allow all child components access to the <i>theme object.</i>
  </p>
)

export const ThemeProviderExample =({ toggled }) => (<Example
  isToggled={ toggled }
  headerText={ 'ReThemeProvider' }
  description={ description }
  codeText={ AppReThemeProviderTxt }
  allowedProps={[
    {
      type: 'object',
      key: 'theme',
      description: 'App Theme object. Rules should be defined as CSS-in-JS format.',
      default: '{}'
    },
    {
      type: 'boolean',
      key: 'merge',
      description: 'Merge the passed in theme with the active theme.',
      default: 'false'
    }
  ]}
/>)
