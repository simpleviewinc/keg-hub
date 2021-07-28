import PropTypes from 'prop-types'
import React, { useState, useCallback, useMemo } from 'react'
import { useStylesCallback } from '@keg-hub/re-theme'
import {
  checkCall,
  noPropArr,
  deepMerge,
  noOpObj,
  isFunc,
  exists,
  toStr,
} from '@keg-hub/jsutils'
import {
  NavGridList,
  NavItemList,
  NavItem,
  NavHeader
} from './restyle.navList'

/**
 * RenderGroupItems
 * @summary Renders the sub-items of each section in the items prop passed to the NavList component
 * @function
 * @private
 * @param {Object} props - see NavList PropTypes
 * @param {Object|Array} items - Items to be rendered
 * @param {function} renderItem - Item render prop, Overrides the default render method for items
 * @param {string} group - Name of the group / section the item belongs to
 * @param {function} onItemPress - Called when a NavItem is pressed
 * @param {Object} styles - CSS rules for how the items should be display
 *
 */
const RenderGroupItems = ({ items, renderItem, group, onItemPress, styles }) => {
  const lastIdx = items.length -1
  return Object.entries(items)
    .map(([ key, item ], idx) => {
      const itemProps = {
        group,
        styles,
        title: key,
        onItemPress,
        key: `${group}-${key}`,
        first: idx === 0,
        last: idx === lastIdx,
        ...item
      }

      return isFunc(renderItem)
        ? renderItem(itemProps)
        : (<NavItem {...itemProps} />)
    })
}

/**
 * RenderGroupHeader
 * @summary Renders the header component for a section from the items passed to NavList component
 * @function
 * @private
 * @param {Object} props - see NavList PropTypes
 * @param {function} renderHeader - Header render prop, Overrides the default render method the header
 * @param {boolean} header - True if the header should be rendered
 *
 */
const RenderGroupHeader = ({ renderHeader, header, ...props }) => {
  return isFunc(renderHeader)
    ? renderHeader(props)
    : header && (<NavHeader {...props}/>)
}

/**
 * Helper hook to determine the toggled value based on passed in props or internal state
 * If toggled is passed in as a prop, then use that. Otherwise manage it internally
 * @function
 * @private
 * @param {Object} headerToggle - Switch to set clicking the header will toggle the items drawer
 * @param {function} onHeaderPress - Called when a Nav header is pressed
 * @param {Object} props - see NavList PropTypes
 * @param {Object} drawerProps - Custom props passed to the drawer component
 *
 * @returns {Object} - Derived toggled state and on toggle press method
 */
const useToggledValue = (headerToggle, onHeaderPress, props, drawerProps) => {
  const { meta } = props
  const toggled = useMemo(() => {
    return [meta?.toggled, drawerProps?.toggled, props.toggled].find(toggled => exists(toggled))
  }, [meta?.toggled, drawerProps?.toggled, props.toggled])

  // If toggled exists, then it should be managed externally via onHeaderPress
  // Otherwise manage toggled internally
  const toggleExists = exists(toggled)
  const [headerToggled, setToggled] = useState(toggled)
  
  const onTogglePress = useCallback(event => {
    checkCall(onHeaderPress, event, meta)
    !toggleExists && setToggled(!headerToggled)
  }, [
    meta,
    toggled,
    toggleExists,
    headerToggle,
    onHeaderPress,
    headerToggled,
  ])

  return {
    onTogglePress,
    toggled: toggleExists ? toggled : headerToggled,
  }
}

/**
 * RenderList
 * @summary Renders the sections passed to the NavList component
 * @function
 * @private
 * @param {Object} props - see NavList PropTypes
 *
 */
const RenderList = props => {
  const {
    first,
    header=true,
    headerToggle=true,
    groupKey,
    HeaderIcon,
    headerProps=noOpObj,
    iconProps=noOpObj,
    last,
    meta=noOpObj,
    onHeaderPress,
    onItemPress,
    renderHeader,
    renderItem,
    styles,
    drawerProps=noOpObj
  } = props

  const drawer = exists(props.drawer)
    ? props.drawer
    : !header
      ? false
      : Boolean(meta.items && meta.items.length)

  const group = meta.group || groupKey
  const {toggled, onTogglePress} = useToggledValue(
    headerToggle,
    onHeaderPress,
    props,
    drawerProps[groupKey],
  )

  const RenderedItems = meta.items && meta.items.length
    ? (
        <RenderGroupItems
          first={first}
          last={last}
          items={ meta.items}
          group={ group }
          renderItem={renderItem}
          onItemPress={onItemPress}
          styles={ styles?.item }
        />
      )
    : noPropArr

  return (
    <>
      <RenderGroupHeader
        group={group}
        header={header}
        onPress={onTogglePress}
        styles={styles?.header}
        title={meta.title || group}
        renderHeader={renderHeader}
        Icon={meta.Icon || HeaderIcon}
        {...headerProps}
        last={last}
        first={first}
        toggled={toggled}
        iconProps={iconProps}
      />
      { header && drawer
        ? (
            <NavItemList
              className='keg-sub-items-drawer'
              {...drawerProps}
              last={last}
              first={first}
              styles={styles}
              toggled={toggled}
              drawerStyles={drawerProps?.styles}
            >
              { RenderedItems }
            </NavItemList>
          )
        : RenderedItems
      }
    </>
  )

}

/**
 * NavList
 * @summary Navigation List Item component
 * @param {Object} props - see NavList PropTypes
 *
 */
export const NavList = React.forwardRef((props, ref) => {
  const {
    className,
    header=true,
    items=noPropArr,
    renderItem,
    onItemPress,
    styles=noOpObj,
  } = props

  const itemEntries = Object.entries(items)
  const itemsLength = itemEntries.length - 1
  const ignoreToggle = itemsLength > 0

  return itemsLength > -1
    ? header !== false 
      ? itemEntries.map(([ key, meta=noOpObj ], index) => {
          const { key:metaKey, group, title, uuid, id } = meta

          const groupKey = [metaKey, group, title, uuid, id].reduce((built, item) => (
            exists(item && toStr(item).trim()) ? `${built}-${item}`.trim() : built
          ), ``)

          return (
            <NavGridList
              ref={ref}
              key={groupKey}
              style={ styles?.main }
              className={[`keg-nav-list`, className ]}
            >
              <RenderList
                { ...props }
                meta={meta}
                index={index}
                styles={styles}
                groupKey={groupKey}
                first={index === 0}
                last={itemsLength === index}
                toggled={ignoreToggle ? null : props.toggled}
              />
            </NavGridList>
          )
        })
      : (
          <NavGridList
            ref={ref}
            style={ styles?.main }
            className={[`keg-nav-list`, `keg-nav-no-header`, className ]}
          >
            <RenderGroupItems
              items={items}
              styles={styles?.item}
              renderItem={renderItem}
              group={`no-header-list`}
              onItemPress={onItemPress}
            />
          </NavGridList>
        )
    : null 
})


NavList.propTypes = {
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  /**
   * List of items to be rendered, with included metadata.
   */
  items: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
  /**
   * CSS rules for how the item lists should be display
   */
  styles: PropTypes.object,
  /**
   * Switch to set if each groups items should be rendered in a Drawer component
   */
  drawer: PropTypes.bool,
  /**
   * Switch to set if each group should render a Header component 
   */
  header: PropTypes.bool,
  /**
   * Switch to set clicking the header will toggle the items drawer. Ignored if props.drawer === false 
   */
  headerToggle: PropTypes.bool,
  /**
   * Custom Icon component for each groups header
   */
  HeaderIcon: PropTypes.node,
  /**
   * Custom props to pass on to the Header component
   */
  headerProps: PropTypes.object,
  /**
   * Custom props to pass on to the Icon component
   */
  iconProps: PropTypes.object,
  /**
   * Called when the Groups header is clicked
   */
  onHeaderPress: PropTypes.func,
  /**
   * Called when an Item is pressed
   */
  onItemPress: PropTypes.func,
  /**
   * Header render prop, Overrides the default render method for each item
   */
  renderHeader: PropTypes.func,
  /**
   * Item render prop, Overrides the default render method for each item
   */
  renderItem: PropTypes.func,
  /**
   * Custom props to pass on to the Drawer component. Ignored when drawer is false
   */
  drawerProps: PropTypes.object,
}