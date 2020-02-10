import React from 'react'
import { Example } from '../../components'
import { ReuseRefInput } from './reuseRefInput'

// eslint-disable-next-line import/no-webpack-loader-syntax
import ReuseRefInputTxt from '!!raw-loader!./reuseRefInput.js'

export const ReuseRefExample = ({ isToggled }) => (<Example
  isToggled={ isToggled }
  headerText={ 'Reuse Hook Ref' }
  component={ <ReuseRefInput title={ 'Reuse Hook Ref Input' } />}
  codeText={ ReuseRefInputTxt }
/>)
