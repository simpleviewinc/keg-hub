import React from 'react'
import { Example } from '../../components'
import { UseThemeFocusInput } from './useThemeFocusInput'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UseThemeFocusInputTxt from '!!raw-loader!./useThemeFocusInput.js'

const description = (
  <p>
    Use this hook to toggle between two styles based on the <b>focus</b> state of the component. This hook should be combined with either the <b>withTheme HOC</b> or <b>useTheme hook</b> to get access to the theme.
  </p>
)


export const UseThemeFocusExample = ({ toggled }) => (<Example
  isToggled={ toggled }
  headerText={ 'useThemeFocus' }
  description={ description }
  component={ <UseThemeFocusInput title={ 'useThemeFocus Input' } /> }
  codeText={ UseThemeFocusInputTxt }
  allowedArgs={[
    {
      type: 'object',
      key: 'Default Style',
      description: <span>Default style to use when <b>NOT</b> in a focus state.</span>,
      default: '{}'
    },
    {
      type: 'object',
      key: 'Focus Style',
      description: 'Active Style to use when in a focus state',
      default: '{}'
    },
    {
      type: 'object',
      key: 'Options',
      description: 'Options object to change how the hook handles toggling between default and focus styles.',
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
      description: 'When the focus state is true, the default and focus styles will be merged, with the focus styles overriding the default styles. This is inline with how css works normally. To disable this, set the option to true.',
      default: 'undefined'
    },
  ]}
/>)
