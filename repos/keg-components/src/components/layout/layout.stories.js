/* eslint-disable import/first */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { View, P, Grid, Column, Row } from '../../'

const stories = storiesOf('Layout', module)

const viewStyles = { maxWidth: '80vw', margin: 'auto', marginTop: 30 }
const textStyles = {
  paddingTop: 15,
  paddingBottom: 15,
  textAlign: 'center',
  borderColor: "rgba(0,0,0,.3)",
  borderWidth: 1,
  borderStyle: 'solid',
}

stories.add('Grid', () =>
  <View style={ viewStyles } >
    <Grid>
      <P>Keg Grid Component</P>
    </Grid>
  </View>
)

stories.add('Row', () =>
  <View style={ viewStyles } >
    <Grid>
      <Row>
        <P style={ textStyles } >
          Keg Row 1
        </P>
      </Row>
      <Row>
        <P style={ textStyles } >
          Keg Row 2
        </P>
      </Row>
      <Row>
        <P style={ textStyles } >
          Keg Row 3
        </P>
      </Row>
    </Grid>
  </View>
)

stories.add('Column - Auto Size', () =>
  <View style={ viewStyles } >
    <Grid>
      <Column>
        <P style={ textStyles } >
          Keg Column 1
        </P>
      </Column>
      <Column>
        <P style={ textStyles } >
          Keg Column 2
        </P>
      </Column>
      <Column>
        <P style={ textStyles } >
          Keg Column 3
        </P>
      </Column>
    </Grid>
  </View>
)

stories.add('Column - Manual Size', () =>
  <View style={ viewStyles } >
    <Grid>
      <Column size={ 3 } >
        <P style={ textStyles } >
          Keg Column ( Size: 3 )
        </P>
      </Column>
      <Column size={ 6 } >
        <P style={ textStyles } >
          Keg Column ( Size: 6 )
        </P>
      </Column>
      <Column size={ 3 } >
        <P style={ textStyles } >
          Keg Column ( Size: 3 )
        </P>
      </Column>
    </Grid>
  </View>
)

stories.add('Rows and Columns', () =>
  <View style={ viewStyles } >
    <Grid>
      <Row>
        <Grid>
          <Column>
            <P style={ textStyles } >
              Row 1 - Column 1
            </P>
          </Column>
          <Column>
            <P style={ textStyles } >
              Row 1 - Column 2
            </P>
          </Column>
        </Grid>
      </Row>
    </Grid>
    <Grid>
      <Row>
        <Grid>
          <Column>
            <P style={ textStyles } >
              Row 2 - Column 1
            </P>
          </Column>
          <Column>
            <P style={ textStyles } >
              Row 2 - Column 2
            </P>
          </Column>
          <Column>
            <P style={ textStyles } >
              Row 2 - Column 3
            </P>
          </Column>
          <Column>
            <P style={ textStyles } >
              Row 2 - Column 4
            </P>
          </Column>
        </Grid>
      </Row>
    </Grid>
  </View>
)