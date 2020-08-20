import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@simpleviewinc/re-theme'
import { get } from '@ltipton/jsutils'
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
    LeftIconComponent,
    rightIcon,
    RightIconComponent,
    IconComponent,
    onRightClick,
    shadow,
    ellipsis,
    themePath,
    type = 'default',
    children,
    ...elprops
  } = props

  const [headerStyles] = useThemePath(themePath || `appHeader.${type}`, styles)
  // builds the left, center, and right section based on props

  return (
    <View
      dataSet={AppHeader.dataSet.main}
      {...elprops}
      style={theme.join(
        headerStyles.main,
        shadow && get(headerStyles, ['shadow'])
      )}
    >
      { children || (
        <>
          <Side
            styles={headerStyles.content}
            iconName={leftIcon}
            IconElement={LeftIconComponent || IconComponent}
            action={onLeftClick}
          >
            { LeftComponent }
          </Side>

          <Center
            ellipsis={ellipsis}
            theme={theme}
            styles={headerStyles.content.center}
            title={title}
          >
            { CenterComponent }
          </Center>

          <Side
            right
            styles={headerStyles.content}
            iconName={rightIcon}
            IconElement={RightIconComponent || IconComponent}
            action={onRightClick}
          >
            { RightComponent }
          </Side>
        </>
      ) }
    </View>
  )
}

AppHeader.dataSet = {
  main: { class: 'app-header-main' },
  left: { class: 'app-header-content-left' },
  right: { class: 'app-header-content-right' },
  center: { class: 'app-header-content-center' },
}

AppHeader.propTypes = {
  title: PropTypes.string,
  styles: PropTypes.object,
  RightComponent: PropTypes.element,
  LeftComponent: PropTypes.element,
  CenterComponent: PropTypes.element,
  onLeftClick: PropTypes.func,
  leftIcon: PropTypes.string,
  LeftIconComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.elementType,
  ]),
  onRightClick: PropTypes.func,
  rightIcon: PropTypes.string,
  RightIconComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.elementType,
  ]),
  IconComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.elementType,
  ]),
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
 * @property {Object} styles
 * @property {String=} title - title displayed in the center 
 * @property {Component} children  - custom component to display on the center section. overrides the other props

 * @returns {Component} - center component
 */
const Center = props => {
  const { styles, title, ellipsis = true, children } = props

  return (
    <View
      dataSet={AppHeader.dataSet.center}
      style={styles.main}
    >
      { (children && renderFromType(children, {}, null)) || (
        <H6
          ellipsis={ellipsis}
          style={styles.content.title}
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
 * @property {Object} styles
 * @property {String=} iconName - name of icon to use (FontAwesome icons). uses the Icon component
 * @property {Component} IconElement - icon component for the icon set (e.g. FontAwesome)
 * @property {Function} action - function to perform on section click
 * @property {Component} children  - custom component to display on the section. overrides the other props
 * @property {Boolean} right - to decide which side theme to use
 *
 * @returns {Component} - section component
 */
const Side = props => {
  const { styles, iconName, IconElement, action, children, right } = props

  const position = right ? 'right' : 'left'
  // get the styles for the specified position
  const contentStyles = get(styles, [ position, 'content' ])
  const iconProps = {
    styles,
    IconElement,
    iconName,
    position,
  }

  const showIcon = iconName && IconElement

  return (
    <View
      dataSet={AppHeader.dataSet[position]}
      style={get(styles, [ position, 'main' ])}
    >
      { /* if 'action' is passed in, use a button to wrap the icon */ }
      { (children && renderFromType(children, {}, null)) ||
        (action ? (
          <Button
            styles={contentStyles.button}
            onClick={action}
          >
            { showIcon && <CustomIcon {...iconProps} /> }
          </Button>
        ) : (
          showIcon && (
            <View style={contentStyles.main}>
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
 * @property {Object} styles - default theme style
 * @property {String} iconName - icon name
 * @property {Component} IconElement - icon component for the icon set
 * @property {String} position - side position (left/right)
 *
 * @returns {Component} - Customized Icon component
 */
const CustomIcon = props => {
  const { styles, iconName, IconElement, position } = props

  return (
    <Icon
      name={iconName}
      Element={IconElement}
      styles={get(styles, [ position, 'content', 'icon' ])}
    />
  )
}
