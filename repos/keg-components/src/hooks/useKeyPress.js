import { useState, useCallback, useEffect } from 'react'
import { getPlatform } from 'KegGetPlatform'

const platform = getPlatform()

/**
 * Helper for `useKeyPress` that sets and removes window listeners
 * @param {Function} upHandler 
 * @param {Function} downHandler 
 */
const manageListeners = (upHandler, downHandler) => {
  window.addEventListener('keydown', downHandler)
  window.addEventListener('keyup', upHandler)

  // cleanup
  return () => {
    window.removeEventListener('keydown', downHandler)
    window.removeEventListener('keyup', upHandler)
  }
}

/**
 * @param {string} targetKey
 * @return {boolean} whether the key was pressed down or not
 */
export const useKeyPress = targetKey => {
  const [ keyPressed, setKeyPressed ] = useState(false)

  const downHandler = useCallback(
    evt => evt.key === targetKey && setKeyPressed(true),
    [ setKeyPressed, targetKey ]
  )

  const upHandler = useCallback(
    evt => evt.key === targetKey && setKeyPressed(false),
    [ setKeyPressed, targetKey ]
  )

  useEffect(() => {
    if (platform !== 'web') return
    return manageListeners(upHandler, downHandler)
  }, [ downHandler, upHandler ])

  return keyPressed
}
