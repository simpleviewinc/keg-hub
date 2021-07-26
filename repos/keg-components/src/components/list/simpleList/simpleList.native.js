import PropTypes from 'prop-types'
import React,  { useState, useCallback, useMemo } from 'react'
import { useStylesCallback } from '@keg-hub/re-theme'
import {
  checkCall,
  noPropArr,
  deepMerge,
  noOpObj,
  isFunc
} from '@keg-hub/jsutils'
import {
  GridList,
  SimpleItemList,
  SimpleItem,
  SimpleHeader
} from './simpleList.restyle'

const RenderListItems = ({ items, renderItem, group, onItemPress, styles }) => {
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

const RenderList = props => {
  const {
    drawer=true,
    first,
    header=true,
    headerToggle=true,
    groupKey,
    HeaderIcon,
    iconProps,
    last,
    meta=noOpObj,
    onHeaderPress,
    onItemPress,
    renderItem,
    styles,
    drawerProps=noOpObj
  } = props

  const group = meta.group || groupKey
  const toggled = meta.toggled || drawerProps[groupKey]?.toggled || props.toggled || false
  const [ headerToggled, setToggled ] = useState(toggled)

  const onTogglePress = useCallback(event => {
    checkCall(onHeaderPress, event, meta)
    headerToggle && setToggled(!headerToggled)
  }, [ toggled, onHeaderPress, meta, headerToggled, headerToggle ])

  const RenderedItems = (
    <RenderListItems
      first={first}
      last={last}
      items={ meta.items || noPropArr }
      group={ group }
      renderItem={renderItem}
      onItemPress={ onItemPress }
      styles={ styles?.item }
    />
  )

  return (
    <>
      { header && (
        <SimpleHeader
          first={first}
          last={last}
          Icon={HeaderIcon}
          iconProps={iconProps}
          toggled={ toggled }
          onPress={ onTogglePress }
          title={ group }
          styles={styles?.header }
        />
      )}
      { header && drawer
        ? (
            <SimpleItemList
              {...drawerProps}
              last={last}
              first={first}
              toggled={ toggled }
              styles={ styles }
              className='keg-sub-items-drawer'
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

  return itemEntries.length
    ? itemEntries.map(([ key, meta ], index) => {
        return (
          <GridList
            className={["keg-simple-list", className ]}
            key={`${meta.group}-${key}`}
            style={ styles?.main }
          >
            <RenderList
              { ...props }
              first={index === 0}
              last={itemsLength === index}
              index={index}
              groupKey={key}
              meta={meta}
              styles={styles}
            />
          </GridList>
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
  drawer: PropTypes.bool,
  header: PropTypes.bool,
  headerToggle: PropTypes.bool,
  HeaderIcon: PropTypes.node,
  iconProps: PropTypes.object,
  meta: PropTypes.object,
  onHeaderPress: PropTypes.func,
  onItemPress: PropTypes.func,
  renderItem: PropTypes.func,
  drawerProps: PropTypes.object,
}