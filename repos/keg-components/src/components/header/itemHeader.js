import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@keg-hub/re-theme'
import { get } from '@keg-hub/jsutils'
import { View } from 'KegView'
import { Button } from '../button'
import { Icon } from 'KegIcon'
import { H5 } from '../typography'
import { renderFromType } from '../../utils'
import { useThemePath } from '../../hooks'
import { useClassList } from '../../hooks/useClassList'
import { noPropObj } from '../../utils/helpers/noop'
import { isValidComponent } from '../../utils/validate/isValidComponent'

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
    className,
    classNames = noPropObj,
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
    dataSet,
    ...elprops
  } = props

  const classContent = classNames.content || noPropObj

  const [headerStyles] = useThemePath(themePath || `header.itemHeader`, styles)
  const mainCls = useClassList(classNames.main, [ 'keg-header', className ])

  // builds the left, center, and right section based on props
  return (
    <View
      className={mainCls}
      dataSet={dataSet?.main || ItemHeader.dataSet.main}
      {...elprops}
      style={theme.join(
        headerStyles.main,
        shadow && get(headerStyles, [ 'main', 'shadow' ])
      )}
    >
      { children || (
        <>
          <Side
            classNames={classContent.left}
            dataSet={dataSet?.content?.left || ItemHeader.dataSet.content.left}
            styles={headerStyles.content}
            iconName={leftIcon}
            IconElement={LeftIconComponent || IconComponent}
            action={onLeftClick}
          >
            { LeftComponent }
          </Side>

          <Center
            classNames={classContent.center}
            dataSet={
              dataSet?.content?.center || ItemHeader.dataSet.content.center
            }
            ellipsis={ellipsis}
            theme={theme}
            styles={headerStyles.content?.center}
            title={title}
          >
            { CenterComponent }
          </Center>

          <Side
            right
            classNames={classContent.right}
            dataSet={
              dataSet?.content?.right || ItemHeader.dataSet.content.right
            }
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

ItemHeader.dataSet = {
  main: { class: 'item-header-main' },
  content: {
    left: {
      main: { class: 'item-header-content-left-main' },
    },
    right: {
      main: { class: 'item-header-content-right-main' },
    },
    center: {
      main: { class: 'item-header-content-center-main' },
    },
  },
}

ItemHeader.propTypes = {
  dataSet: PropTypes.object,
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
 * @property {Object} props.dataSet - dataSet attribute
 * @property {Component} props.children  - custom component to display on the center section. overrides the other props

 * @returns {Component} - center component
 */
const Center = props => {
  const {
    classNames = noPropObj,
    styles,
    title,
    ellipsis = true,
    children,
    dataSet,
  } = props

  const mainCls = useClassList(classNames.main, ['keg-header-center'])
  const titleCls = useClassList(classNames.title || classNames.text, [`keg-header-title`])
  
  return (
    <View
      className={mainCls}
      dataSet={dataSet?.main}
      style={styles.main}
    >
      { (children && renderFromType(children, {}, null)) || (
        <H5
          className={titleCls}
          dataSet={dataSet?.content}
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
 * @property {Object} props.dataSet - dataSet attribute
 * @property {String=} props.iconName - name of icon to use (FontAwesome icons). uses the Icon component
 * @property {Component} props.IconElement - icon component for the icon set (e.g. FontAwesome)
 * @property {Function} props.action - function to perform on section click
 * @property {Component} props.children  - custom component to display on the section. overrides the other props
 * @property {Boolean} props.right - to decide which side theme to use
 *
 * @returns {Component} - section component
 */
const Side = props => {
  const {
    classNames = noPropObj,
    styles,
    iconName,
    IconElement,
    action,
    children,
    right,
    dataSet,
  } = props

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
  const mainCls = useClassList(classNames.main, [`keg-header-${position}`])
  const btnCls = useClassList(classNames.button, [`keg-header-${position}-button`])

  return (
    <View
      className={mainCls}
      dataSet={dataSet?.main}
      style={get(styles, [ position, 'main' ])}
    >
      { /* if 'action' is passed in, use a button to wrap the icon */ }
      { (children && renderFromType(children, {}, null)) ||
        (action ? (
          <Button
            className={classNames.button}
            dataSet={dataSet?.content}
            styles={contentStyles.button}
            onClick={action}
          >
            { showIcon && <CustomIcon {...iconProps} /> }
          </Button>
        ) : (
          showIcon && (
            <View
              className={classNames.icon}
              dataSet={dataSet?.content}
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
  const { styles, iconName, IconElement, position } = props

  return (
    <Icon
      name={iconName}
      Element={IconElement}
      styles={get(styles, [ position, 'content', 'icon' ])}
    />
  )
}
