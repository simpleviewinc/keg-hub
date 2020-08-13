import { useRef, useState, useCallback } from 'react'
import { isFunc, isObj, isColl, deepMerge, checkCall } from '@ltipton/jsutils'
import { Constants } from '../constants'

/**
 * Updates a listener on an element ( add || remove )
 * @param {Object} element - Node to update the event listener on
 * @param {string} type - Type of update to make ( add || remove )
 * @param {Object} events - Events listener names
 * @param {Object} methods - Functions that run when the event is fired
 *
 * @returns {void}
 */
const updateListeners = (element, type, events, methods) => {
  // Just return if no element or event type
  if (!isObj(element) || !isFunc(element[type])) return null

  // Set the methods to the event
  element[type](events.on, methods.on)
  element[type](events.off, methods.off)
}

/**
 * Works the same as an inline ref function, but adds event listeners to the element
 * <br/> Uses useCallback so that event listeners get changed when the element changes
 * @param {React Ref|Object} ref - React Ref object or regular object
 * @param {Object} events - Events listener names
 * @param {Object} methods - Functions that run when the event is fired
 *
 * @returns {React Callback Ref} - Reference to the callback method
 */
const createCBRef = (hookRef, events, methods, ref) => {
  // This keeps track of the hookRef, and the event listeners on the element
  return useCallback(
    element => {
      // Remove any old events if they exist
      hookRef.current &&
        updateListeners(
          hookRef.current,
          Constants.REMOVE_EVENT,
          events,
          methods
        )

      // Set the new element to the hookRef.current
      // Because this hookRef is internal, we have to update current manually
      hookRef.current = element

      // Add the new listeners to the updated element
      hookRef.current &&
        updateListeners(hookRef.current, Constants.ADD_EVENT, events, methods)

      // If no hookRef, then call the clean up method
      !hookRef.current && methods.cleanup()

      // Want to update the callback when the methods changes
      // If the values change, then the method will also change
      // So this will fire when the values change
    },
    [ methods.on, methods.off ]
  )
}

/**
 * Creates the on and off methods for the hook
 * Wrap them in useCallback so we can use as dependencies in the Main callback ref
 * @param {*} onValue - Value to set when hook is active
 * @param {*} offValue - Value to set when hook is not active
 *
 * @returns {Object} - Contains the hooks to update to values on and off
 */
const createMethods = (offValue, onValue, setValue) => {
  const cbWatchers = [ onValue, offValue ]

  // These methods get called from createCBRef returned function
  // An event listener is added to the ref.current element
  // And when the event happens, Then either the on || off method is called!
  // When called, it calls the setValue function which updates the state with the passed in value
  return {
    // Pass in the onValue / offValue to ensure it updates when the value changes
    // This will also cause the useCallback create from createCBRef to fire
    off: useCallback(() => setValue(offValue), cbWatchers),

    // Watch both the onValue
    on: useCallback(() => setValue(onValue), cbWatchers),

    // Clean up helper to avoid memory leaks
    cleanup: methods => {
      if (!methods) return

      isFunc(methods.on) && methods.on(undefined)
      isFunc(methods.off) && methods.off(undefined)
      onValue = undefined
      offValue = undefined
      setValue = undefined
      methods = undefined
    },
  }
}

const getOptions = (options = {}) => (options && !isObj(options) ? {} : options)

/**
 * Checks if the onValue and Off value should be joined
 * @param {Object} offValue - Value to use then when state is off
 * @param {Object} onValue - Value to use then when state is on
 * @param {Object} valueOn - Alternate Value to use then when state is on
 * @param {boolean} noMerge - Should merge the onValue with the offValue
 *
 * @returns {Object} - valueOn or merged on / off object
 */
const checkJoinValues = (offValue, onValue, valueOn, noMerge) => {
  // Need to clean it up to be more clear
  // Just returning deepMerge(offValue, onValue) works the same
  return noMerge || !isColl(onValue) || !isColl(offValue)
    ? valueOn
    : deepMerge(offValue, onValue)
}

/**
 * Creates a hook that will switch between the passed in values
 * <br/> It switches between values based on the passed in events it's listening to
 * @param {Object} events - Events listener names to listen too
 *
 * @returns {function} - Hook function
 */
export const hookFactory = events =>
  /**
   * Hook function called from within a react component
   *
   * @param {Any} offValue - Value to set when not active
   * @param {Any} onValue - Value to set when active
   * @param {boolean} noMerge - Don't merge the offValue with the onValue when false
   *
   * @returns {Array} - Contains the ref to be added to an element, and the current value
   */
  (offValue, onValue, options = {}) => {
    const { ref, noMerge } = getOptions(options)

    // Get the ref object
    const hookRef = ref || useRef()
    // Set the default value as off
    const [ value, setValue ] = useState(offValue)

    // Set default joinedOnOff, to allow comparing against later
    const [activeValue] = useState(
      checkJoinValues(offValue, onValue, onValue, noMerge)
    )

    // Create the callback ref ( i.e. function ref )
    // Which gets the node the ref is attached to as an argument
    const elementRef = createCBRef(
      // Create an internal ref, that keeps track of the current element
      // This way we can remove event listeners when the element changes
      hookRef,
      // Names of events to listen to
      events,
      // Create the methods to update the value using the setValue method
      // These methods call the setValue method, which updates the state
      createMethods(offValue, activeValue, setValue),
      ref
    )

    // Get the value to use based on the current state of the values
    const useValue =
      value === offValue
        ? // If the offValue and value are the same then no updated state
          value
        : // Check if value is equal to the activeValue ( original offValue + onValue merged )
        value === activeValue
          ? // If value and activeValue are equal,
          // then the State is active for either the passed in ref or the current ref
            activeValue
          : offValue

    return !isFunc(ref)
      ? // Return the elementRef function and value to the component
        [ elementRef, useValue, setValue ]
      : checkCall(() => {
        // When ref is a function, and there's no change
        // or when value is not equal to off value or updated value,
        // then we want to return the off value, because that has the updated state from the
        // Other refs update
        // So wrap the callbacks so we can call the passed in ref, and the new ref
        const wrapRef = element => {
          ref(element)
          elementRef(element)
        }

        return [ wrapRef, useValue, setValue ]
      })
  }
