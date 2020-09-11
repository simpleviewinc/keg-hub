import React, { useState, useEffect, useRef } from 'react'
import * as ReactDOM from 'react-dom'
import { Consumer } from './headContext'
import { hasDomAccess } from '../helpers/hasDomAccess'

const canUseDOM = hasDomAccess()

/**
 * HeadElement - sub-component of the HeadProvider, which consumes it's context
 * <br/>This allows it to check if it should render or not based on it a duplicate already exists
 * @param {object} props
 * @param {object} props.tag - Dom Element tag name
 * @param {string} props.style - Overrides children when props.tag === style
 * @param {string} props.id - Id attribute to be applied to the component
 * @param {string} props.tagProps - Extra props to pass to the Dom Element on render
 */
export const HeadElement = props => {

  const { tag: Tag, style, id, ...tagProps } = props

  const indexRef = useRef(-1)
  const headTagsRef = useRef(null)
  const children = (Tag === 'style' && style) || props.children

  useEffect(() => {
    const { tag } = props
    const children = (Tag === 'style' && style) || props.children
    
    // For the first element, this needs to be set as a side effect the render
    // For all other element is should be bypassed
    // That way this does not fail the check because it's already set
    indexRef.current = headTagsRef.current.addTag(tag, children, id)

    return () => {
      headTagsRef.current.removeTag(tag, indexRef.current, id)
    }
  }, [])

  return (
    <Consumer>
      {headTags => {
        headTagsRef.current = headTags
        return canUseDOM && headTags.shouldRender(Tag, indexRef.current, children)
          ? ReactDOM.createPortal(
              <Tag
                {...tagProps}
                id={id}
                children={ children }
              />,
              document.head
            )
          : null
      }}
    </Consumer>
  )

}
