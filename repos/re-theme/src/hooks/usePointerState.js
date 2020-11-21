import { isHoverEnabled } from "./isHoverEnabled"
import { useRef, useState, useMemo, useCallback, useEffect } from "react"
import { checkCall, isFunc, noOpObj } from '@keg-hub/jsutils'

/**
 * Builds all event listeners and state for an elements hover state
 * @param {Object} options - Contains callbacks and refs for the pointerState
 *
 * @return {Object} - Contains hover state, and event listeners functions
 */
const buildHoverCallbacks = ({ onMouseIn, onMouseOut }) => {
  const [hover, setHovered] = useState(false)

  const handleMouseEnter = useCallback(event => {
    if(!isHoverEnabled() || hover) return

    checkCall(onMouseIn, event)
    setHovered(true)
  }, [hover, onMouseIn])

  const handleMouseLeave = useCallback(event => {
    checkCall(onMouseOut, event)
    setHovered(false)
  }, [hover, onMouseOut])

  return { hover, handleMouseEnter, handleMouseLeave }
}

/**
 * Builds all event listeners and state for an elements active state
 * @param {Object} options - Contains callbacks and refs for the pointerState
 *
 * @return {Object} - Contains active state, and event listeners functions
 */
const buildActiveCallBacks = ({ onMouseDown, onMouseUp }) => {
  const [active, setActive] = useState(false)

  const handleMouseUp = useCallback(event => {
    checkCall(onMouseUp, event)
    setActive(false)
  }, [setActive, onMouseUp])

  const handleMouseDown = useCallback(event => {
    checkCall(onMouseDown, event)
    setActive(true)

    // Attach the mouseup listener to the document, so it always gets called on mouse-up
    document.addEventListener("mouseup", handleMouseUp, { once: true })
  }, [setActive, onMouseDown])

  return { active, handleMouseDown, handleMouseUp }
}

/**
 * Builds all event listeners and state for an elements focus/blur state
 * @param {Object} options - Contains callbacks and refs for the pointerState
 *
 * @return {Object} - Contains focus state, and event listeners functions
 */
const buildFocusCallBacks = ({ onFocus, onBlur }) => {
  const [focus, setFocus] = useState(false)

  const handleBlur = useCallback(event => {
    checkCall(onBlur, event)
    setFocus(false)
  }, [setFocus, onBlur])

  const handleFocus = useCallback(event => {
    checkCall(onFocus, event)
    setFocus(true)
  }, [setFocus, onFocus])

  return { focus, handleFocus, handleBlur }
}

/**
 * Builds all element event listeners to track updates to the mouse state
 * @param {Object} options - Contains callbacks and refs for the pointerState
 * @param {string} pointerState - pointer state to track
 *
 * @return {Object} - Contains mouse states, and event listeners functions
 */
const buildElementEvents = (options, pointerState) => {

  const {
    onBlur,
    onFocus,
    onMouseIn,
    onMouseOut,
    onMouseDown,
    onMouseUp,
  } = options

  const {
    hover=false,
    handleMouseEnter,
    handleMouseLeave
  } = pointerState === 'hover'
    ? buildHoverCallbacks(options)
    : noOpObj

  const {
    active=false,
    handleMouseDown,
    handleMouseUp
  } = pointerState === 'active'
    ? buildActiveCallBacks(options)
    : noOpObj

  const {
    focus=false,
    handleFocus,
    handleBlur
  } = pointerState === 'focus'
    ? buildFocusCallBacks(options)
    : noOpObj

  return useMemo(() => {
    return {
      active,
      hover,
      events: pointerState === 'hover'
        ? { mouseenter: handleMouseEnter, mouseleave: handleMouseLeave }
        : pointerState === 'focus'
          ? { focus: handleFocus, blur: handleBlur }
          : { mousedown: handleMouseDown }
    }
  }, [
    onMouseIn,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
    active,
    hover,
    focus,
  ])
}

/**
 * Creates a callback ref to get access to the Element from a ref
 * @param {Dom Element} element - Element to attach mouse events to
 * @param {Object} events - Dom events to attach to the element
 * @param {string} method - Name of the method used to update events on the element
 * 
 * @return {void}
 */
const loopElementEvents = (element, events, method) => {
  Object.entries(events)
    .map(([ eventName, action ]) => element[method](eventName, action))
}

/**
 * Creates a callback ref to get access to the Element from a ref
 * @param {Object} options - Contains callbacks and refs for the pointerState
 * @param {Object} events - Dom events to attach to the element obtained from the ref
 * @param {string} pointerState - pointer state to track
 * 
 * @return {function} - callbackRef to apply to the element to be tracked
 */
const createCBRef = (options, events, pointerState) => {

  const elementRef = useRef(null)
  const passedRef = options.ref

  const callbackRef = useCallback(element => {
    elementRef.current = element

    isFunc(passedRef)
      ? passedRef(element)
      : passedRef && (passedRef.current = element)

  }, [ passedRef, passedRef.current, events, pointerState ])

  useEffect(() => {
    elementRef &&
      elementRef.current &&
      loopElementEvents(elementRef.current, events, 'addEventListener')

    return () => {
      elementRef &&
        elementRef.current &&
        loopElementEvents(elementRef.current, events, 'removeEventListener')
    }
  }, [ elementRef && elementRef.current, events, pointerState ])

  return callbackRef
}

/**
 * Gets the current state of the pointer / mouse
 * @param {Object} options - Contains callbacks and refs for the pointerState
 * @param {string} pointerState - pointer state to track
 * 
 * @return {Object} - States of the pointed relative to the passed in pointerState
 */
export const usePointerState = (options={}, pointerState) => {
  const { events, hover, active, focus } = buildElementEvents(options, pointerState)

  return {
    hover,
    focus,
    active,
    ref: createCBRef(options, events, pointerState),
  }
}
