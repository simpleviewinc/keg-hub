import React,  { useState, useCallback, useMemo } from 'react'
import {
  checkCall,
  noPropArr,
  deepMerge,
  noOpObj,
  isFunc
} from '@keg-hub/jsutils'
import { DrawerList } from './simpleList.restyle'
import { ListItem } from './listItem'
import { ListHeader } from './listHeader'


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
        : (<ListItem {...itemProps} />)
    })
}

export const RenderList = props => {
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
        <ListHeader
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
            <DrawerList
              {...drawerProps}
              last={last}
              first={first}
              toggled={ toggled }
              styles={ styles }
              className='keg-sub-items-drawer'
              drawerStyles={drawerProps?.styles}
            >
              { RenderedItems }
            </DrawerList>
          )
        : RenderedItems
      }
    </>
  )

}
