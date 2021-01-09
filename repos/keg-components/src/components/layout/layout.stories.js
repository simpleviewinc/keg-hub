import React from 'react'
import { storiesOf } from '@storybook/react'
import { P, Grid, Column, Row } from '../../'
import { StoryWrap } from 'StoryWrap'

const textStyles = {
  paddingTop: 15,
  paddingBottom: 15,
  textAlign: 'center',
  borderColor: 'rgba(0,0,0,.3)',
  borderWidth: 1,
  borderStyle: 'solid',
}

storiesOf('Components/Layout/Grid', module).add('Grid', () => (
  <StoryWrap>
    <Grid>
      <P>Keg Grid Component</P>
    </Grid>
  </StoryWrap>
))
storiesOf('Components/Layout/Row', module).add('Row', () => (
  <StoryWrap>
    <Grid>
      <Row>
        <P style={textStyles}>Keg Row 1</P>
      </Row>
      <Row>
        <P style={textStyles}>Keg Row 2</P>
      </Row>
      <Row>
        <P style={textStyles}>Keg Row 3</P>
      </Row>
    </Grid>
  </StoryWrap>
))

storiesOf('Components/Layout/Column', module).add('Column - Auto Size', () => (
  <StoryWrap>
    <Grid>
      <Column>
        <P style={textStyles}>Keg Column 1</P>
      </Column>
      <Column>
        <P style={textStyles}>Keg Column 2</P>
      </Column>
      <Column>
        <P style={textStyles}>Keg Column 3</P>
      </Column>
    </Grid>
  </StoryWrap>
))

storiesOf('Components/Layout/Column', module).add(
  'Column - Manual Size',
  () => (
    <StoryWrap>
      <Grid>
        <Column size={3}>
          <P style={textStyles}>Keg Column ( Size: 3 )</P>
        </Column>
        <Column size={6}>
          <P style={textStyles}>Keg Column ( Size: 6 )</P>
        </Column>
        <Column size={3}>
          <P style={textStyles}>Keg Column ( Size: 3 )</P>
        </Column>
      </Grid>
    </StoryWrap>
  )
)

storiesOf('Components/Layout/Grid', module).add('Rows and Columns', () => (
  <StoryWrap>
    <Grid>
      <Row>
        <Grid>
          <Column>
            <P style={textStyles}>Row 1 - Column 1</P>
          </Column>
          <Column>
            <P style={textStyles}>Row 1 - Column 2</P>
          </Column>
        </Grid>
      </Row>
    </Grid>
    <Grid>
      <Row>
        <Grid>
          <Column>
            <P style={textStyles}>Row 2 - Column 1</P>
          </Column>
          <Column>
            <P style={textStyles}>Row 2 - Column 2</P>
          </Column>
          <Column>
            <P style={textStyles}>Row 2 - Column 3</P>
          </Column>
          <Column>
            <P style={textStyles}>Row 2 - Column 4</P>
          </Column>
        </Grid>
      </Row>
    </Grid>
  </StoryWrap>
))
