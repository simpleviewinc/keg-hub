import { isHoverEnabled } from "./isHoverEnabled"
import { useRef, useState, useMemo, useCallback, useEffect } from "react"
import { checkCall, isFunc, noOpObj } from '@keg-hub/jsutils'

/**
 * Builds hover state and all hover event listeners
 * @param {Object} options - Contains callbacks and refs for the pointerState
 *
 * @return {Object} - Contains hovered state, and event listeners functions
 */
const buildHoverCallbacks = ({ onMouseIn, onMouseOut }) => {
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = useCallback(event => {
    if(!isHoverEnabled() || hovered) return

    checkCall(onMouseIn, event)
    setHovered(true)
  }, [hovered, onMouseIn])

  const handleMouseLeave = useCallback(event => {
    checkCall(onMouseOut, event)
    setHovered(false)
  }, [hovered, onMouseOut])

  return { hovered, handleMouseEnter, handleMouseLeave }
}

/**
 * Builds all hover event listeners and hover state
 * @param {Object} options - Contains callbacks and refs for the pointerState
 *
 * @return {Object} - Contains hovered state, and event listeners functions
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
  }, [setActive, onMouseUp])

  return { active, handleMouseDown, handleMouseUp }
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
    onMouseIn,
    onMouseOut,
    onMouseDown,
    onMouseUp,
  } = options

  const {
    hovered=false,
    handleMouseEnter,
    handleMouseLeave
  } = pointerState === 'hovered'
    ? buildHoverCallbacks(options)
    : noOpObj

  const {
    active=false,
    handleMouseDown,
    handleMouseUp
  } = pointerState === 'active'
    ? buildActiveCallBacks(options)
    : noOpObj

  return useMemo(() => {
    return {
      active,
      hovered,
      events: pointerState === 'hovered'
        ? { mouseenter: handleMouseEnter, mouseleave: handleMouseLeave }
        : { mousedown: handleMouseDown }
    }
  }, [
    onMouseIn,
    onMouseOut,
    onMouseDown,
    onMouseUp,
    hovered,
    active
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
  const { events, hovered, active } = buildElementEvents(options, pointerState)

  return {
    active,
    hovered,
    ref: createCBRef(options, events, pointerState),
  }
}
