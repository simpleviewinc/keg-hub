import React, { useState } from 'react'
import { isArr, get } from '@svkeg/jsutils'
import {
  Grid,
  Header,
  Row,
  Slider
} from '../../components'

export const Section = ({ children, Element, toggled, style, theme, title }) => {
  
  children = children && ((isArr(children) && children) || [ children ])
  const [ isToggled, setToggled ] = useState(toggled || false)

  return (
    <Grid style={ style } >
      { title && (
        <Header
          style={ get(theme, 'app.grid.title') }
          title={ title }
          isToggled={ isToggled }
          setToggled={ setToggled }
        />
      )}
      <Slider toggled={ isToggled } Element={ Element } >
        { children && children.map((child, index) => (
          <Row key={ index } >
            { child }
          </Row>
        )) }
      </Slider>
    </Grid>
  )
}
