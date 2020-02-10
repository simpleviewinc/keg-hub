import React from 'react'
import { Example } from '../../components'
import { UseThemeActiveButton } from './useThemeActiveButton'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UseThemeActiveButtonTxt from '!!raw-loader!./useThemeActiveButton.js'

const description = (
  <p>
    Use this hook to toggle between two styles based on the <b>active</b> state of the component. This hook should be combined with either the <b>withTheme HOC</b> or <b>useTheme hook</b> to get access to the theme.
  </p>
)

export const UseThemeActiveExample = ({ toggled }) => (<Example
  isToggled={ toggled }
  headerText={ 'useThemeActive' }
  description={ description }
  component={ <UseThemeActiveButton >useThemeActive Button</UseThemeActiveButton> }
  codeText={ UseThemeActiveButtonTxt }
  allowedArgs={[
    {
      type: 'object',
      key: 'Default Style',
      description: <span>Default style to use when <b>NOT</b> in an active state.</span>,
      default: '{}'
    },
    {
      type: 'object',
      key: 'Active Style',
      description: 'Active Style to use when in an active state',
      default: '{}'
    },
    {
      type: 'object',
      key: 'Options',
      description: 'Options object to change how the hook handles toggling between default and active styles.',
      default: '{}'
    },
    {
      type: 'object',
      key: 'Options.ref',
      description: 'Allows passing in a ref returned an other hook. This allows styles to change for multiple states.',
      default: 'undefined'
    },
    {
      type: 'object',
      key: 'Options.noMerge',
      description: 'When the active state is true, the default and active styles will be merged, with the active styles overriding the default styles. This is inline with how css works normally. To disable this, set the option to true.',
      default: 'undefined'
    },
  ]}
/>)
