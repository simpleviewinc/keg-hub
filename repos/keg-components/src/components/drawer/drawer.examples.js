import React,  { useState, useMemo } from 'react'
import { useStylesCallback } from '@keg-hub/re-theme'
import { Drawer } from './drawer'
import { Grid } from '../layout/grid'
import { View } from '../view/view'
import { Subtitle } from '../typography/subtitle'
import { P } from '../typography/p'
import { H5 } from '../typography/h5'
import { Button } from '../button/button'
import { ChevronDown } from '../../assets/icons'
import { Icon } from 'KegIcon'

const buildStyles = (theme, helpers) => {
  const variant = helpers.toggled ? 'secondary' : 'primary'

  return {
    main: {
      ...theme.flex.column,
    },
    toggle: {
      main: {
        ...theme.flex.center,
        marginTop: theme.margin.size,
        alignSelf: 'center'
      },
      button: {
        main: {
          padding: theme.padding.size / 2,
          paddingHorizontal: theme.padding.size,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }
      },
      icon: {
        color: theme.colors.surface[variant].colors.dark,
        marginRight: theme.margin.size / 3,
        fontSize: 18,
        transitionProperty: 'transform',
        transitionDuration: '0.8s',
        transform: helpers.toggled ? 'rotate(90deg)' : 'rotate(0deg)'
      },
      subtitle: {
        color: theme.colors.surface[variant].colors.dark,
        fontWeight: 'bold',
      }
    },
    drawer: {},
    content: {
      main: {
        padding: theme.padding.size * 2,
        paddingBottom: theme.padding.size,
        borderRadius: 5,
        backgroundColor: theme.colors.opacity._5
      }
    }
  }
}

const DrawerToggle = ({ toggled, onPress, styles }) => {
  const action = toggled ? 'Hide' : 'See'
  const variant = toggled ? 'secondary' : 'primary'
  return (
    <View style={styles.main} >
      <Button
        className='drawer-toggle'
        themePath={`button.text.${variant}`}
        styles={styles.button}
        onPress={onPress}
      >
        <Icon
          styles={styles.icon}
          Component={ChevronDown}
        />
        <Subtitle style={styles.subtitle} >
          {action} Goat Facts
        </Subtitle>
      </Button>
    </View>
  )
}

const DrawerContent = ({ styles }) => {
  return (
    <View style={styles.main} >
      <H5 style={{ fontWeight: 'bold' }} >
        Goat Facts
      </H5>
      <P>
        Goats are herd animals and will become depressed if kept without any goat companions. So, it is unhealthy for a goat if a family just owns one as a pet.
      </P>
      <P>
        Goats’ pupils (like many hooved animals) are rectangular. This gives them vision for 320 to 340 degrees (compared to humans with 160-210) around them without having to move and they are thought to have excellent night vision.
      </P>
      <P>
        Goats, being mountain animals, are very good at climbing; they’ve been known to climb to the tops of trees, or even dams!
      </P>
    </View>
  )
}

export const Basic = props => {
  const { initialToggle } = props

  const [ toggled, setToggled ] = useState(initialToggle || false)
  const drawerStyles = useStylesCallback(buildStyles, [ toggled ], { toggled })

  const onTogglePress = event => {
    setToggled(!toggled)
  }

  return (
    <Grid style={drawerStyles.main} >
      <Drawer
        styles={ drawerStyles.drawer }
        toggled={ toggled }
      >
        <DrawerContent styles={ drawerStyles.content } />
      </Drawer>
      <DrawerToggle
        toggled={ toggled }
        onPress={ onTogglePress }
        styles={drawerStyles.toggle }
      />
    </Grid>
  )

}

