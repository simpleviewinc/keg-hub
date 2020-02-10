import React, { useState } from 'react'
import { withTheme } from 're-theme'
import { get } from 'jsutils'
import PropTypes from 'prop-types'
import {
  ExampleCode,
  ExampleComponent,
  ExampleHeader,
  ExampleProps,
  Slider
} from '../../components'

export const Example = withTheme(props => {

  const { theme, isToggled, headerText } = props
  const [ toggled, setToggled ] = useState(isToggled || false)

  const sectionStyle = theme.join(
    get(theme, 'app.section'),
    get(theme, 'margin.bottom'),
    props.style
  )

  return (
    <section style={ sectionStyle }>
      { props.headerText && (
        <ExampleHeader text={ headerText } toggled={toggled} setToggled={setToggled} />
      )}
      <Slider style={ get(theme, 'app.example.wrapper') } toggled={ toggled } >
        <span>
          { props.description }
        </span>
        <div style={ get(theme, 'padding.bottom') } >
          { props.codeText && ( <ExampleCode text={ props.codeText } /> )}
          { props.component && ( <ExampleComponent component={ props.component } /> )}
          { props.allowedProps && props.allowedProps.length && (
            <ExampleProps allowed={ props.allowedProps } />
          )}
          { props.allowedArgs && props.allowedArgs.length && (
            <ExampleProps allowed={ props.allowedArgs } title={ 'Arguments' } />
          )}
        </div>
      </Slider>
    </section>
  )

})

Example.propTypes = {
  theme: PropTypes.object,
  style: PropTypes.object,
  headerText: PropTypes.string,
  codeText: PropTypes.string,
}
