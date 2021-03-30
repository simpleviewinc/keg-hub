import { useEffect } from 'react'

/**
 * 
 * @param {Event} evt - event object
 * @param {RefObject} ref - element to check 
 * @returns {boolean} - true if event occured outside of element stored at ref.current
 */
const eventIsOutside = (evt, ref) => {
  return ref?.current && !ref.current.contains(evt.target)
}

/**
 * Listens for the user clicking outside the element stored in `ref`. If it detects a click,
 * then it calls onOutsideClick.
 * @param {RefObject} ref - ref object storing a DOM Node
 * @param {Function?} onOutsideClick - fn of form (event) => {}
 */
export const useOutsideDetect = (ref, onOutsideClick) => {
  useEffect(() => {
    // alert if clicked outside of element stored at ref
    const handleClickOutside = event => 
      eventIsOutside(event, ref) && onOutsideClick?.(event)

    document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [ref, onOutsideClick ])
}