import React, { useState, useEffect } from 'react'
import cssProperties from './cssProperties'
import { Helmet as ReactHelmet } from 'react-helmet'
import { checkCall, deepMerge, isArr, get, omitKeys, pickKeys, isObj, uuid } from '@svkeg/jsutils'
import { hasDomAccess } from '../helpers/hasDomAccess'
import { jsToCss } from '../styleParser/jsToCss'

/**
 * Constant key to ensue React keeps the same reference to the component internally
 * @string
 *
 */
const helmetKey = uuid()

/**
 * Builds a fresh childRefs Object, merging with the passed in customRefs
 * @function
 * @param {Object} customRefs - Should match the same format as the childRefs object
 *
 * @returns {void}
 */
const getElementRefs = (customRefs={}) => {
  return deepMerge({
    link: [],
    meta: [],
    style: [],
    script: [],
  }, customRefs)
}

/**
 * Checks the type of the passed in element
 * If it matches one of the valid Helmet Elements, then is content is parsed and used
 * @function
 * @param {Component} element - Valid Helmet Child Components
 * @param {Object} parsedRefs - Perviously parsed Child Components
 * 
 * @returns {Object} parsedRefs - Updated with the passed in elements content
 */
const getRefByType = (element, parsedRefs) => {
    switch (element.type) {
      case Title: {
        parsedRefs.title = element.props.children || ''
        break
      }
      case Style: {
        parsedRefs.style.push({
          cssText: element.props.children
        })
        break
      }
      case Meta: {
        parsedRefs.meta.push(pickKeys(
          element.props,
          'name',
          'property',
          'content'
        ))
        break
      }
      case Link: {
        parsedRefs.link.push(pickKeys(
          element.props,
          'rel',
          'href',
          'type',
          'as',
          'crossorigin',
          'media'
        ))
        break
      }
      case Script: {
        script = omitKeys(element.props, 'children')
        element.props.type === 'application/ld+json' &&
          (script.innerHTML = element.props.children)

        parsedRefs.script.push(script)
        break
      }
    }

  return parsedRefs
}

/**
 * Loops through the passed in children, and trys to parse their content
 * @function
 * @param {Array} children - Array of Valid Helmet Child Components
 * @param {Object} customRefs - Should match the same format as the childRefs object
 *
 * @returns {Object} parsedRefs - Updated with the passed in childrens content
 */
const parseChildRefs = (children, customRefs) => {
  const elements = isArr(children) ? children : [children]

  return elements.reduce((parsedRefs, element) => {

    return isArr(element)
      ? parseChildRefs(element, parsedRefs)
      : element.type === React.Fragment
        ? parseChildRefs(element.props.children, parsedRefs)
        : getRefByType(element, parsedRefs)

  }, getElementRefs(customRefs))
}

/**
 * Simple helper to get a consistent Id for the Helmet Component
 * If the location.pathname fails then uses a constant helmetKey
 * @function
 *
 * @returns {string} window.location.pathname (browser url) || helmetKey (uuid)
 */
const getLocationPath = () => {
  return !hasDomAccess()
    ? helmetKey
    : checkCall(() => (get(window, 'location.pathname', helmetKey))) 
}


let __RefsManager = {}
/**
 * Updates the childRefs use in the Helmet componet
 * Merges with the current __RefsManager.childRefs
 * @function
 * @param {Object} childRefs - Valid Helmet React Components as children
 *
 * @returns {void}
 */
const updateChildRefs = (childRefs) => {
  checkCall(
    __RefsManager.setChildRefs,
    parseChildRefs(childRefs, __RefsManager.childRefs)
  )
}

/**
 * Calls updateChildRefs with the passed in childRefs
 * @function
 * @param {Array} childRefs - Valid Helmet React Components as children
 *
 * @returns {void}
 */
export const PortalHelmet = childRefs => {
  hasDomAccess() &&  updateChildRefs(childRefs)
}

/**
 * Valid Helmet Child Components
 * Other component types will not be rendered
 * @function
 * 
 * @returns {Component} - React Component
 */
export const Style = props => (<style type="text/css" {...props} />)
export const Link = props => <link {...props} />
export const Meta = props => <meta {...props} />
export const Title = props => <title {...props} />
export const Script = props => <script {...props} />


/**
 * Wraps the ReactHelmet component
 * Converts passed in child props into proper format
 * @function
 * @param {Object} props - Props to pass on to the React Helmet Component
 * @param {Array} props.children - Valid Helmet React Components as children
 * @param {Object} props.references - Pre-Formatted React Helmet Component props
 * @param {string|number} props.id - Key used by react internally
 * @param {string|number} props.styles - Custom Css Styles in CssInJs format
 * 
 *
 * @returns {Component} ReactHelmet - React Helmet Component
 */
export const Helmet = props => {
  const { children, references, id, styles } = props
  
  // Create the child references in the format required by React Helmet Component
  const refs = children &&
    parseChildRefs(children, references)

  // If a styles CssInJs object is passed, we have to convert it to a css string
  refs &&
    isObj(styles) &&
    refs.style.unshift({ cssText: jsToCss(styles) })

  // Store the child refs on the state, so we can refernece them later
  const [ childRefs, setChildRefs ] = useState(refs)

  // Use the useEffect hook to externalize the childRefs and setChildRefs
  // This allows us to update the childRefs from outside of react
  useEffect(() => {
    Object.assign(__RefsManager, { childRefs, setChildRefs })
    return () => { __RefsManager = {} }
  })

  return (
    <ReactHelmet
      {...childRefs}
      key={ id || getLocationPath() }
    />
  )
}


