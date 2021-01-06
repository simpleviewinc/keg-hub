import React from 'react'
import { H4, Header } from '../../components'
import { useTheme } from '@keg-hub/re-theme'

export const ExampleHeader = props => {

  const  { toggled, setToggled } = props
  
  const theme = useTheme()

  const style = theme.get(
    'flex.display',
    'flex.wrap',
    'padding.vert',
    'margin.bottom'
  )
  
  return (
    <Header
      isToggled={ toggled }
      setToggled={ setToggled }
      style={ style }
      title={ props.children || props.text }
      TextComp={ H4 }
    />
  )

}