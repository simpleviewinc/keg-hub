import { useEffect } from 'react'
import { useKeyPress } from './useKeyPress'

/**
 *
 * @param {Array<Object>} items
 * @param {Number} currentIndex
 * @param {Function} selectItem
 */
export const useAutocompleteKeyChange = (items, currentIndex, selectItem) => {
  const pressedDown = useKeyPress('ArrowDown')
  const pressedUp = useKeyPress('ArrowUp')

  useEffect(() => {
    // get this inside of the component or as input from another hook
    if (!pressedDown && !pressedUp) return
    const delta = pressedDown ? 1 : -1
    const nextIndex = (currentIndex + delta) % (items.length - 1)

    selectItem(items[nextIndex])
  }, [ items, pressedDown, currentIndex, selectItem ])
}
