import React, { useEffect } from 'react'
import * as ReactDOM from 'react-dom'
import { hasDomAccess } from '../helpers/hasDomAccess'

const canUseDOM = hasDomAccess()

/**
 * HeadElement - sub-component of the HeadProvider, which consumes it's context
 * <br/>This allows it to check if it should render or not based on it a duplicate already exists
 * @param {object} props
 * @param {object} props.Tag - Dom Element tag name
 * @param {string} props.style - Overrides children when props.tag === style
 * @param {string} props.id - Id attribute to be applied to the component
 * @param {string} props.tagProps - Extra props to pass to the Dom Element on render
 */
export const HeadElement = props => {

  const { Tag, style, hash, ...tagProps } = props

  // const children = (Tag === 'style' && style) || props.children
  const children = props.children

  useEffect(() => {

    return () => {
      // TODO: remove the style tag from the dom on unmount
    }
  }, [])

  return canUseDOM && hash
    ? ReactDOM.createPortal(
        <Tag
          {...tagProps}
          id={hash}
          children={ children }
        />,
        document.head
      )
    : null
}
