import React from 'react'
import { BaseHeader } from './baseHeader'
import { deepMerge } from '@svkeg/jsutils'

/**
 * ItemHeader
 * props match that of baseHeader
 * @param {Object} props
 * @param {Object=} props.styles
 * @param {Object=} props.dataSet
 * @param {string=} props.title
 * @param {Component=} props.RightComponent
 * @param {Component=} props.LeftComponent
 * @param {Component=} props.CenterComponent
 * @param {Function=} props.onLeftClick
 * @param {Object=} props.leftIcon
 * @param {Component=} props.LeftIconComponent
 * @param {Function=} props.onRightClick
 * @param {Object=} props.rightIcon
 * @param {Component=} props.RightIconComponent
 * @param {Component=} props.IconComponent
 * @param {boolean=} props.shadow
 * @param {boolean=} props.ellipsis
 * @param {string=} props.themePath
 */
export const ItemHeader = props => {
  const { dataSet, ...otherProps } = props
  return (
    <BaseHeader
      dataSet={deepMerge(ItemHeader.dataSet, dataSet)}
      {...otherProps}
    />
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
  ...BaseHeader.propTypes,
}
