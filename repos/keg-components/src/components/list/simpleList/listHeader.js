import React, { useMemo } from 'react'
import { wordCaps, isStr } from '@keg-hub/jsutils'
import {
  H6,
  Icon,
  Row,
  Touchable,
  View,
} from 'SVComponents'
import { noOpObj } from 'SVUtils/helpers/noop'
import { useToggleAnimate } from 'SVHooks'
import { useTheme, useThemeHover, useStyle } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import { Animated } from 'react-native'


const buildIconProps = (icon, theme) => {
  return {
    name: 'chevron-down',
    color: theme?.colors?.palette?.gray01,
    size: 20,
    ...(icon ? isStr(icon) ? { name: icon } : icon : null)
  }
}

const HeaderIcon = ({ Icon, iconProps, styles, theme, toggled }) => {

  const builtProps = useMemo(
    () => buildIconProps(iconProps, theme),
    [ iconProps, theme ]
  )

  const { animation } = useToggleAnimate({
    toggled,
    values: { from: 0, to: 1 },
    config: { duration: 400 }
  })

  return (
    <Animated.View 
      className='list-header-icon'
      style={[
        get(styles, 'icon.animate'),
        {
          transform: [{
            rotate: animation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '180deg']
            }) 
          }]
        }
      ]}
    >
      <Icon { ...builtProps } styles={ styles } />
    </Animated.View>
  )

}

export const ListHeader = props => {
  const {
    first,
    onPress,
    styles,
    title,
    Icon,
    iconProps,
    toggled
  } = props

  const theme = useTheme()
  const mergeStyles = useStyle('list.header', styles)
  const [ rowRef, listStyles ] = useThemeHover(mergeStyles.default, mergeStyles.hover)

  const toggledStyle = toggled ? mergeStyles.active : noOpObj
  const rowStyle = useStyle(listStyles.row, toggledStyle?.row)

  return (
    <Touchable
      className="list-header-main"
      activeOpacity={ get(mergeStyles, 'active.main.opacity') }
      touchRef={ rowRef }
      style={[
        listStyles?.main,
        toggledStyle?.main,
        first && listStyles?.first?.main,
        first && toggledStyle?.first?.main,
      ]}
      onPress={ onPress }
    >
    <Row
      style={rowStyle}
      className="list-header-row"
    >
      <H6
        style={[listStyles.title, toggledStyle?.title]}
        className="list-header-title"
      >
        { wordCaps(title) }
      </H6>
      { Icon && (
        <HeaderIcon
          Icon={ Icon }
          iconProps={iconProps}
          styles={[listStyles.toggle, toggledStyle?.toggle]}
          theme={ theme }
          toggled={ toggled }
        />
      )}
    </Row>
  </Touchable>
  )
}