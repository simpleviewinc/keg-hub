import { useCallback, useEffect } from 'react'

/**
 * Helper to listen for click events
 * @function
 * @private
 * <br/>Checks if the sidebar should be closed based on click location
 * @param {boolean} toggled - Is the sidebar toggled open
 * @param {function} setIsToggled - Toggle the state of the sidebar open or closed
 * @param {Object} event - Native dom event
 *
 * @returns {void}
 */
export const useWindowClick = (cb, ...args) => {
  const onWindowClick = useCallback(cb.bind(window, ...args), [cb, ...args])

  useEffect(() => {
    window.addEventListener('click', onWindowClick)
    return () => window.removeEventListener('click', onWindowClick)
  }, [onWindowClick])
  
}
