import PropTypes from 'prop-types'
import React,  { useState, useCallback, useMemo } from 'react'
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
  SimpleGridList,
  SimpleItemList,
  SimpleItem,
  SimpleHeader
} from './simpleList.restyle'

const RenderGroupItems = ({ items, renderItem, group, onItemPress, styles }) => {
  return Object.entries(items)
    .map(([ key, item ]) => {
      const itemProps = {
        group,
        styles,
        title: key,
        onItemPress,
        key: `${group}-${key}`,
        ...item
      }

      return isFunc(renderItem)
        ? renderItem(itemProps)
        : (<SimpleItem {...itemProps} />)
    })
}

const RenderGroupHeader = ({ renderHeader, header, ...props }) => {
  return isFunc(renderHeader)
    ? renderHeader(props)
    : header && (<SimpleHeader {...props}/>)
}

const useToggledValue = (toggled, headerToggle, onHeaderPress, meta) => {
  // If toggled exists, then it should be managed externally via onHeaderPress
  // Otherwise manage toggled internally
  const toggleExists = exists(toggled)
  const [headerToggled, setToggled] = useState(toggled)
  
  const onTogglePress = useCallback(event => {
    checkCall(onHeaderPress, event, meta)
    !toggleExists &&
      headerToggle &&
      setToggled(!headerToggled)
  }, [
    meta,
    toggled,
    toggleExists,
    headerToggle,
    onHeaderPress,
    headerToggled,
  ])

  const toggleState = useMemo(() => {
    return toggleExists && (toggled !== headerToggled)
      ? toggled
      : headerToggled
  }, [
    toggled,
    headerToggled,
    toggleExists,
  ])

  return {
    onTogglePress,
    toggled: toggleState,
  }
}

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
      : meta.items && meta.items.length

  const group = meta.group || groupKey
  const {toggled, onTogglePress} = useToggledValue(
    meta.toggled || drawerProps[groupKey]?.toggled || props.toggled || null,
    headerToggle,
    onHeaderPress,
    meta
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
        Icon={meta.Icon || HeaderIcon}
        {...headerProps}
        last={last}
        first={first}
        toggled={toggled}
        iconProps={iconProps}
      />
      { header && drawer
        ? (
            <SimpleItemList
              className='keg-sub-items-drawer'
              {...drawerProps}
              last={last}
              first={first}
              styles={styles}
              toggled={toggled}
              drawerStyles={drawerProps?.styles}
            >
              { RenderedItems }
            </SimpleItemList>
          )
        : RenderedItems
      }
    </>
  )

}

export const SimpleList = (props) => {
  const { items=noPropArr, styles=noOpObj, className, } = props
  const itemEntries = Object.entries(items)
  const itemsLength = itemEntries.length - 1

  return itemsLength > -1
    ? itemEntries.map(([ key, meta=noOpObj ], index) => {
        const { key:metaKey, group, title, uuid } = meta

        const groupKey = [metaKey, group, title, uuid].reduce((built, item) => (
          exists(item && toStr(item).trim()) ? `${built}-${item}`.trim() : built
        ), ``)

        return (
          <SimpleGridList
            className={["keg-simple-list", className ]}
            key={groupKey}
            style={ styles?.main }
          >
            <RenderList
              { ...props }
              first={index === 0}
              last={itemsLength === index}
              index={index}
              groupKey={groupKey}
              meta={meta}
              styles={styles}
            />
          </SimpleGridList>
        )
      })
    : null 
}


SimpleList.propTypes = {
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