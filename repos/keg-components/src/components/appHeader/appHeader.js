import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@simpleviewinc/re-theme'
import { get } from 'jsutils'
import { View } from 'KegView'
import { Button } from 'KegButton'
import { Icon } from 'KegIcon'
import { H6 } from '../typography'
import { renderFromType } from '../../utils'
import { useThemePath } from '../../hooks'

/**
 * AppHeader
 * @summary custom header component
 * @param {Object} props - see PropTypes below
 *
 * @returns {Component} - header component
 */
export const AppHeader = props => {
  const theme = useTheme()

  const {
    title,
    styles,
    RightComponent,
    CenterComponent,
    LeftComponent,
    onLeftClick,
    leftIcon,
    onRightClick,
    rightIcon,
    shadow,
    ellipsis,
    themePath,
    type = 'default',
    children,
  } = props

  const [headerStyles] = useThemePath(themePath || `appHeader.${type}`, styles)

  // builds the left, center, and right section based on props
  return (
    <View
      style={theme.join(
        get(headerStyles, ['container']),
        shadow && get(headerStyles, [ 'container', 'shadow' ]),
        styles
      )}
    >
      { children || (
        <>
          <Side
            defaultStyle={headerStyles}
            iconName={leftIcon}
            action={onLeftClick}
          >
            { LeftComponent }
          </Side>

          <Center
            ellipsis={ellipsis}
            theme={theme}
            defaultStyle={headerStyles}
            title={title}
            textStyle={get(headerStyles, [ 'center', 'content', 'title' ])}
          >
            { CenterComponent }
          </Center>

          <Side
            right
            defaultStyle={headerStyles}
            iconName={rightIcon}
            action={onRightClick}
          >
            { RightComponent }
          </Side>
        </>
      ) }
    </View>
  )
}

AppHeader.propTypes = {
  title: PropTypes.string,
  styles: PropTypes.object,
  RightComponent: PropTypes.element,
  LeftComponent: PropTypes.element,
  CenterComponent: PropTypes.element,
  onLeftClick: PropTypes.func,
  leftIcon: PropTypes.string,
  onRightClick: PropTypes.func,
  rightIcon: PropTypes.string,
  shadow: PropTypes.bool,
  ellipsis: PropTypes.bool,
  themePath: PropTypes.string,
}

/**
 * Center
 * @summary gets the center section for the header component
 * @param {Object} props
 * @property {Object} theme - re-theme object used for styling
 * @property {Boolean=} ellipsis - applies ellipsis on text. default true
 * @property {Object} defaultStyle - default header styles
 * @property {String=} title - title displayed in the center 
 * @property {Object} textStyle - custom style obj for text
 * @property {Component} children  - custom component to display on the center section. overrides the other props

 * @returns {Component} - center component
 */
const Center = props => {
  const {
    theme,
    defaultStyle,
    title,
    textStyle,
    ellipsis = true,
    children,
  } = props

  return (
    <View style={get(defaultStyle, [ 'center', 'main' ])}>
      { (children && renderFromType(children, {}, null)) || (
        <H6
          ellipsis={ellipsis}
          style={theme.join(
            get(defaultStyle, [ 'center', 'content', 'title' ]),
            textStyle
          )}
        >
          { title }
        </H6>
      ) }
    </View>
  )
}

/**
 * Side
 * @summary builds the side sections of the appheader
 * @param {Object} props
 * @property {Object} defaultStyle - default headerstyle obj for section
 * @property {String=} iconName - name of icon to use (FontAwesome icons). uses the Icon component
 * @property {Function} action - function to perform on section click
 * @property {Component} children  - custom component to display on the section. overrides the other props
 * @property {Boolean} right - to decide which side theme to use
 *
 * @returns {Component} - section component
 */
const Side = props => {
  const { defaultStyle, iconName, action, children, right } = props

  const position = right ? 'right' : 'left'
  const mainStyles = get(defaultStyle, [
    'side',
    position,
    'content',
    'container',
  ])
  const iconProps = {
    defaultStyle,
    iconName,
    position,
  }

  return (
    <View style={get(defaultStyle, [ 'side', position, 'main' ])}>
      { (children && renderFromType(children, {}, null)) ||
        (action ? (
          <Button
            styles={{ main: mainStyles }}
            onClick={action}
          >
            { iconName && <CustomIcon {...iconProps} /> }
          </Button>
        ) : (
          iconName && (
            <View styles={{ main: mainStyles }}>
              <CustomIcon {...iconProps} />
            </View>
          )
        )) }
    </View>
  )
}

/**
 * CustomIcon
 * @summary Creates a customized Icon Component for the side components
 * @param {Object} props
 * @property {Boolean} styled - whether to use the default icon styling or not
 * @property {Object} defaultStyle - default theme style
 * @property {String} iconName - icon name
 * @property {String} position - side position (left/right)
 *
 * @returns {Component} - Customized Icon component
 */
const CustomIcon = props => {
  const { defaultStyle, iconName, position } = props

  return (
    <Icon
      name={iconName}
      styles={get(defaultStyle, [ 'side', position, 'content', 'icon' ])}
    />
  )
}
