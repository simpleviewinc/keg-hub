import { useRef, useState, useMemo, useCallback, useEffect } from "react"
import { checkCall, isFunc, noOpObj } from '@keg-hub/jsutils'
import { hasDomAccess } from '../helpers/hasDomAccess'

/**
 * Tracks if the hover pointer state can be enabled 
 * @type boolean
 */
let isHoverEnabled = false

/**
 * Adds mouse event listeners to the document for tracking hover state
 * Uses mouse move event to enable when hover is enabled
 * @type function
 *
 * @returns {void}
 */
const setDomListeners = () => {
  /**
   * This code checks for mouse movement that occurs more than 1 second after the last touch event.
   * This threshold is long enough to account for longer delays between the
   * browser firing touch AND mouse events on low-powered devices
   */
  const HOVER_THRESHOLD_MS = 1000
  let lastTouchTimestamp = 0

  const enableHover = () => {
    !isHoverEnabled &&
      (Date.now() - lastTouchTimestamp) > HOVER_THRESHOLD_MS &&
      (isHoverEnabled = true)
  }

  const disableHover = () => {
    lastTouchTimestamp = Date.now()
    isHoverEnabled && (isHoverEnabled = false)
  }

  document.addEventListener("touchstart", disableHover, true)
  document.addEventListener("touchmove", disableHover, true)
  document.addEventListener("mousemove", enableHover, true)
}

hasDomAccess() && setDomListeners()

/**
 * Builds event listeners and state for an element based on the pointerState to track
 * @type function
 * @param {Object} options - Contains callbacks and refs for the pointerState
 *
 * @return {Object} - Current state of the pointerState being tracked, and event listeners to be attached to the element
 */
const useEventCallBacks = ({ pointerState, onEvent, offEvent, onName, offName }) => {
  const [status, setStatus] = useState(false)

  const handleOff = useCallback(event => {
    checkCall(offEvent, event)
    setStatus(false)
  }, [status, setStatus, offEvent])

  const handleOn = useCallback(event => {
    // For hover events we need to check if hover is enabled
    if(pointerState === 'hover' && !isHoverEnabled) return

    checkCall(onEvent, event)
    setStatus(true)

    // For active events, we need to attach the mouseup listener to the document, so it always gets called on mouse up
    pointerState === 'active' && 
      document.addEventListener(offName, handleOff, { once: true })

  }, [pointerState, status, setStatus, onEvent])

  return {
    [pointerState]: status,
    [onName]: handleOn,
    [offName]: handleOff,
  }
}

/**
 * Builds all element event listeners to track updates to the mouse state
 * @type function
 * @param {Object} options - Contains callbacks and refs for the pointerState
 * @param {string} pointerState - pointer state to track
 *
 * @return {Object} - Contains mouse states, and event listeners functions
 */
const useElementEvents = (options=noOpObj, pointerState) => {

  const {
    hover=false,
    onMouseIn,
    onMouseOut
  } = pointerState === 'hover'
    ? useEventCallBacks({
        pointerState,
        onName: 'onMouseIn',
        offName: 'onMouseOut',
        onEvent: options.onMouseIn,
        offEvent: options.onMouseOut,
      })
    : noOpObj

  const {
    focus=false,
    onFocus,
    onBlur
  } = pointerState === 'focus'
    ? useEventCallBacks({
        pointerState,
        onName: 'onFocus',
        offName: 'onBlur',
        onEvent: options.onFocus,
        offEvent: options.onBlur,
      })
    : noOpObj

  const {
    active=false,
    onMouseDown,
  } = pointerState === 'active'
    ? useEventCallBacks({
        pointerState,
        onName: 'onMouseDown',
        offName: 'mouseup',
        onEvent: options.onMouseDown,
        offEvent: options.onMouseUp,
      })
    : noOpObj

  return useMemo(() => {
    // Get the events to be returned based on the pointerState
    // Use the Dom event names, NOT the react event names,
    // because these events are directly added to the element through the Dom API
    const events = pointerState === 'hover'
      ? { pointerover: onMouseIn, pointerout: onMouseOut }
      : pointerState === 'focus'
        ? { focus: onFocus, blur: onBlur }
        : { pointerdown: onMouseDown }

    return {
      active,
      focus,
      hover,
      events,
    }
  }, [
    active,
    focus,
    hover,
    onBlur,
    onFocus,
    onMouseDown,
    onMouseIn,
    onMouseOut,
    options.ref,
    pointerState,
  ])
}

/**
 * Loops over the passed in events and adds or removes them from the passed in element
 * @type function
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
 * @type function
 * @param {Object} passedRef - Custom react ref to allow reusing a Ref on a component
 * @param {Object} events - Dom events to attach to the element obtained from the ref
 *
 * @return {function} - callbackRef to apply to the element to be tracked
 */
const createCBRef = (passedRef, events) => {

  const elementRef = useRef(null)

  /**
   * Creates a ref as a function, to be passed as a prop to the element being tracked
   * <br/>Also checks for a custom ref and updates it if needed
   */
  const callbackRef = useCallback(element => {
    elementRef.current = element

    isFunc(passedRef)
      ? passedRef(element)
      : passedRef && (passedRef.current = element)

  }, [elementRef.current, passedRef, passedRef.current])

  /**
   * Hooks that Ensure the event listeners are added to the dom element
   * <br/>Also removes them when the element is removed
   */
  useEffect(() => {
    elementRef.current &&
      loopElementEvents(elementRef.current, events, 'addEventListener')

    return () => {
      elementRef.current &&
        loopElementEvents(elementRef.current, events, 'removeEventListener')
    }
  }, [elementRef.current, events])

  return callbackRef
}

/**
 * Gets the current state of the pointer / mouse
 * @type function
 * @param {Object} options - Contains callbacks and refs for the pointerState
 * @param {string} pointerState - pointer state to track. Must be one of hover, active, or focus
 * 
 * @return {Object} - States of the pointed relative to the passed in pointerState
 */
export const usePointerState = (options=noOpObj, pointerState) => {
  const { events, hover, active, focus } = useElementEvents(options, pointerState)

  return {
    hover,
    focus,
    active,
    events,
    ref: createCBRef(options.ref, events),
  }
}
