import { useState, useCallback, useEffect } from 'react'

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
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [ downHandler, upHandler ])

  return keyPressed
}
