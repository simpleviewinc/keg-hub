import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import { View } from 'KegView'
import { Button } from '../../button'
import { Icon } from 'KegIcon'
import { H5 } from '../../typography'
import { renderFromType } from '../../../utils'
import { useThemePath } from '../../../hooks'
import { useClassList } from 'KegClassList'
import { noPropObj } from '@keg-hub/jsutils'
import { isValidComponent } from '../../../utils/validate/isValidComponent'
import { getPlatform } from 'KegGetPlatform'

const isWeb = getPlatform() === 'web'

/**
 * ItemHeader
 * @summary used to make other types of headers
 * @param {Object} props - see PropTypes below
 *
 * @returns {Component} - header component
 */
export const ItemHeader = props => {
  const theme = useTheme()

  const {
    accessibilityRole,
    appHeader,
    className,
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
    children,
    ...elProps
  } = props

  const headerStyles = useThemePath(themePath || `header.itemHeader`, styles)

  // builds the left, center, and right section based on props
  return (
    <View
      accessibilityRole={(isWeb && accessibilityRole) || 'header'}
      className={useClassList('keg-header', className)}
      {...elProps}
      style={[
        headerStyles.main,
        appHeader && get(headerStyles, [ 'appHeader', 'main' ]),
        shadow && get(headerStyles, [ 'shadow', 'main' ]),
      ]}
    >
      { !isWeb && shadow && <View style={headerStyles?.shadow?.cover} /> }
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
            styles={headerStyles.content?.center}
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

ItemHeader.propTypes = {
  title: PropTypes.string,
  styles: PropTypes.object,
  RightComponent: PropTypes.element,
  LeftComponent: PropTypes.element,
  CenterComponent: PropTypes.element,
  onLeftClick: PropTypes.oneOfType([ PropTypes.func, PropTypes.any ]),
  leftIcon: PropTypes.string,
  LeftIconComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.elementType,
  ]),
  onRightClick: PropTypes.oneOfType([ PropTypes.func, PropTypes.any ]),
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
 * @property {Object} props.theme - re-theme object used for styling
 * @property {Boolean=} props.ellipsis - applies ellipsis on text. default true
 * @property {Object} props.styles
 * @property {String=} props.title - title displayed in the center 
 * @property {Component} props.children  - custom component to display on the center section. overrides the other props

 * @returns {Component} - center component
 */
const Center = props => {
  const { styles, title, ellipsis = true, children } = props

  return (
    <View
      className='keg-header-center'
      style={styles.main}
    >
      { (children && renderFromType(children, {}, null)) || (
        <H5
          className='keg-header-center-title'
          ellipsis={ellipsis}
          style={styles.content.title}
        >
          { title }
        </H5>
      ) }
    </View>
  )
}

/**
 * Side
 * @summary builds the side sections of the appheader
 * @param {Object} props
 * @property {Object} props.styles
 * @property {String=} props.iconName - name of icon to use (FontAwesome icons). uses the Icon component
 * @property {Component} props.IconElement - icon component for the icon set (e.g. FontAwesome)
 * @property {Function} props.action - function to perform on section click
 * @property {Component} props.children  - custom component to display on the section. overrides the other props
 * @property {Boolean} props.right - to decide which side theme to use
 *
 * @returns {Component} - section component
 */
const Side = props => {
  const { styles, iconName, IconElement, action, children, right } = props

  const position = right ? 'right' : 'left'
  // get the styles for the specified position
  const contentStyles = get(styles, [ position, 'content' ], noPropObj)
  const iconProps = {
    styles,
    IconElement,
    iconName,
    position,
  }

  const showIcon = isValidComponent(IconElement)

  return (
    <View
      className={`keg-header-${position}`}
      style={get(styles, [ position, 'main' ])}
    >
      { /* if 'action' is passed in, use a button to wrap the icon */ }
      { (children && renderFromType(children, {}, null)) ||
        (action ? (
          <Button
            className={`keg-header-${position}-button`}
            styles={contentStyles.button}
            onClick={action}
          >
            { showIcon && <CustomIcon {...iconProps} /> }
          </Button>
        ) : (
          showIcon && (
            <View
              className={`keg-header-${position}-icon`}
              style={contentStyles.main}
            >
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
  const { className, iconName, IconElement, position, styles } = props

  return (
    <Icon
      className={className}
      name={iconName}
      Element={IconElement}
      styles={get(styles, [ position, 'content', 'icon' ])}
    />
  )
}
