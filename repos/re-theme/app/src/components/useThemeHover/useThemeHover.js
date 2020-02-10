import React from 'react'
import { Example } from '../../components'
import { UseThemeHoverButton } from './useThemeHoverButton'

// eslint-disable-next-line import/no-webpack-loader-syntax
import UseThemeHoverButtonTxt from '!!raw-loader!./useThemeHoverButton.js'

const description = (
  <p>
    Use this hook to toggle between two styles based on the <b>hover</b> state of the component. This hook should be combined with either the <b>withTheme HOC</b> or <b>useTheme hook</b> to get access to the theme.
  </p>
)

export const UseThemeHoverExample = ({ toggled }) => (<Example
  isToggled={ toggled }
  headerText={ 'useThemeHover' }
  description={ description }
  component={ <UseThemeHoverButton>useThemeHover Button</UseThemeHoverButton> }
  codeText={ UseThemeHoverButtonTxt }
  allowedArgs={[
    {
      type: 'object',
      key: 'Default Style',
      description: <span>Default style to use when <b>NOT</b> in a hover state.</span>,
      default: '{}'
    },
    {
      type: 'object',
      key: 'Hover Style',
      description: 'Active Style to use when in a hover state',
      default: '{}'
    },
    {
      type: 'object',
      key: 'Options',
      description: 'Options object to change how the hook handles toggling between default and hover styles.',
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
      description: 'When the hover state is true, the default and hover styles will be merged, with the hover styles overriding the default styles. This is inline with how css works normally. To disable this, set the option to true.',
      default: 'undefined'
    },
  ]}
/>)