import React, { useMemo } from 'react'
import { Icon } from 'KegIcon'
import { View } from 'KegView'
import { Row } from '../../layout'
import { Animated } from 'react-native'
import { H6 } from '../../typography/h6'
import { Touchable } from '../../touchable'
import { get, noOpObj, wordCaps, isStr } from '@keg-hub/jsutils'
import { useToggleAnimate } from '../../../hooks/useToggleAnimate'
import { useTheme, useThemeHover, useStyle } from '@keg-hub/re-theme'

const buildIconProps = icon => {
  const theme = useTheme()
  return useMemo(() => ({
    name: 'list-header-icon',
    color: theme?.colors?.palette?.gray01,
    size: 20,
    ...(icon ? isStr(icon) ? { name: icon } : icon : null)
  }), [ icon, theme ])
}

const HeaderIcon = ({ Icon, iconProps, styles, toggled }) => {
  const builtProps = buildIconProps(iconProps)
  const { animation } = useToggleAnimate({
    toggled,
    values: {from: 0, to: 1},
    config: {duration: 400}
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
      <Icon { ...builtProps } styles={styles} />
    </Animated.View>
  )
}

export const NavHeader = props => {
  const {
    first,
    onPress,
    styles,
    title,
    Icon,
    iconProps,
    toggled
  } = props

  const [ rowRef, listStyles ] = useThemeHover(styles.default, styles.hover)
  const toggledStyle = toggled ? styles.active : noOpObj
  const rowStyle = useStyle(listStyles.row, toggledStyle?.row)

  return (
    <Touchable
      className="keg-list-header-main"
      activeOpacity={ get(styles, 'active.main.opacity') }
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
        {title}
      </H6>
      { Icon && (
        <HeaderIcon
          Icon={ Icon }
          iconProps={iconProps}
          styles={[listStyles.toggle, toggledStyle?.toggle]}
          toggled={toggled}
        />
      )}
    </Row>
  </Touchable>
  )
}