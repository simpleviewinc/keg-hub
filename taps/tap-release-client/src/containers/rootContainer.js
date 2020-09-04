import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { Section, Grid, Row, Text, withAppHeader } from 'SVComponents'

export const RootContainer = withAppHeader('Tap-Release-Client', props => {
  const theme = useTheme()

  return (
    <Section
      style={{
        ...theme.layout.full.height,
        ...theme.layout.full.width,
        margin: 0,
        borderWidth: 0,
      }}
    >
      <Grid style={theme.margin.all}>
        <Row>
          <Text>Tap into the Keg!</Text>
        </Row>
      </Grid>
    </Section>
  )
})
