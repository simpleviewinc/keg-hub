import React,  { useState, useCallback, useMemo } from 'react'
import { useStylesCallback } from '@keg-hub/re-theme'
import {
  checkCall,
  noPropArr,
  deepMerge,
  noOpObj,
  isFunc
} from '@keg-hub/jsutils'
import { RenderList } from './renderList'
import { GridList } from './simpleList.restyle'

export const SimpleList = (props) => {
  const { items, styles, className, } = props
  const itemsLength = items.length - 1

  return Object.entries(items)
    .map(([ key, meta ], index) => {
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
}