import React from 'react'
import { Helmet as ReactHelmet } from 'react-helmet'
import { checkCall, deepMerge, isArr, get, omitKeys, pickKeys, isObj, uuid } from '@svkeg/jsutils'
import cssProperties from './cssProperties'
import { hasDomAccess } from '../helpers/hasDomAccess'
import { jsToCss } from '../styleParser/jsToCss'

const helmetKey = uuid()

// TODO: need to handle sub style classes
/*
styles = {
  main: {
    ...style rules
  },
  // Current code expects a flat object
  // But styles can come in at any level
  // Need to check for that and handel it properly
  content: {
    main: {
      ...style rules
    },
    content: {
      ...style rules
    }
  }
}

// Update re-theme to dynamicly create the dataSet based on the $class prop
SessionTime.dataSet = {
  main: { class: 'session-time-main' },
  clockIcon: { class: 'ef-sessions-date-time' },
  timeText: { class: 'ef-sessions-date-time' },
}

theme = {
  sessionTime: {
    main: {
      $class: "events-force-main",
      color: ''
    },
    clockIcon: { color: '' },
    timeText: { color: '' },
  }
}

theme.sessionTime.dataSet = {
  main: {
    class: "events-force-main",
  }
}
*/


const getElementRefs = (customRefs={}) => {
  return deepMerge({
    link: [],
    meta: [],
    style: [],
    script: [],
  }, customRefs)
}

const getRefByType = (element, parsedRefs) => {
    switch (element.type) {
      case 'title': {
        parsedRefs.title = element.props.children || ''
        break
      }
      case 'style': {
        parsedRefs.style.push({
          cssText: element.props.children
        })
        break
      }
      case 'meta': {
        parsedRefs.meta.push(pickKeys(
          element.props,
          'name',
          'property',
          'content'
        ))
        break
      }
      case 'link': {
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
      case 'script': {
        script = omitKeys(element.props, 'children')
        element.props.type === 'application/ld+json' &&
          (script.innerHTML = element.props.children)

        parsedRefs.script.push(script)
        break
      }
    }

  return parsedRefs
}

const parseChildReferences = (children, customRefs) => {
  const elements = isArr(children) ? children : [children]

  return elements.reduce((parsedRefs, element) => {

    return isArr(element)
      ? parseChildReferences(element, parsedRefs)
      : element.type === React.Fragment
        ? parseChildReferences(element.props.children, parsedRefs)
        : getRefByType(element, parsedRefs)

  }, getElementRefs(customRefs))
}

const getLocationPath = () => {
  return !hasDomAccess()
    ? helmetKey
    : checkCall(() => (get(window, 'location.pathname', helmetKey))) 
}

export const Helmet = ({ children, references, id, styles }) => {

  const childRefs = parseChildReferences(children, references)
  isObj(styles) && childRefs.style.unshift({ cssText: jsToCss(styles) })

  return (
    <ReactHelmet
      {...childRefs}
      keg={ id || getLocationPath() }
    />
  )
}

export const style = props => (<style type="text/css" {...props} />)
export const link = props => <link {...props} />
export const meta = props => <meta {...props} />
export const title = props => <title {...props} />
export const script = props => <script {...props} />
