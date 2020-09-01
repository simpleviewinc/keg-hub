import React, { Component, useEffect, useRef } from 'react'
import * as ReactDOM from 'react-dom'
import { Consumer } from './headContext'
import { hasDomAccess } from '../helpers/hasDomAccess'

const canUseDOM = hasDomAccess()

export const HeadElement = props => {

  const { tag: Tag, style, id, ...tagProps } = props
  const { name, property } = tagProps

  const indexRef = useRef(-1)
  const headTagsRef = useRef(null)
  const children = Tag === 'style' && (style || props.children)

  useEffect(() => {
    indexRef.current = headTagsRef.current.addTag(Tag, id)

    return () => {
      headTagsRef.current.removeTag(Tag, indexRef.current, id)
    }

  }, [ Tag, name, property, style ])

  return (
    <Consumer>
      {headTags => {
        headTagsRef.current = headTags

        return canUseDOM &&
          headTags.shouldRender(Tag, indexRef.current, id) &&
          ReactDOM.createPortal(
            <Tag {...tagProps} id={id} children={ children } />,
            document.head
          )

      }}
    </Consumer>
  )

}
