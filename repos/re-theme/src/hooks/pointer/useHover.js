import { isHoverEnabled } from "./isHoverEnabled"
import { useRef, useState, useMemo, useCallback } from "react"
import { checkCall, isFunc } from '@keg-hub/jsutils'

const buildMemoEvents = options => {
  const { onMouseEnter, onMouseLeave } = options
  const [ isHovered, setIsHovered ] = useState(false)
  const [ showHover, setShowHover ] = useState(true)

  const handleMouseEnter = useCallback((e) => {
    const doHoverUpdate = isHoverEnabled() && !isHovered
    if(!doHoverUpdate) return

    checkCall(onMouseEnter, e)
    setIsHovered(true)

  }, [ isHovered, onMouseEnter ])

  const handleMouseLeave = useCallback((e) => {
    checkCall(onMouseLeave, e)
    isHovered && setIsHovered(false)
  }, [ isHovered, onMouseLeave ])

  const handleGrant = useCallback(() => setShowHover(false), [])
  const handleRelease = useCallback(() => { setShowHover(true) }, [])

  return {
    onResponderGrant: handleGrant,
    onResponderRelease: handleRelease,
    onPressIn: handleGrant,
    onPressOut: handleRelease,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  }
}

const createCBRef = ref => {
  return useCallback(element => {
    // Do other ref things here as needed

    if(ref)
      !isFunc(ref.current)
        ? (ref.current = element)
        : ref.current(element)

  }, [ ref && ref.current ])
}

export const useHover = (options={}) => {
  const {
    ref,
    onMouseEnter,
    onMouseLeave,
  } = options

  return {
    ref: createCBRef(ref),
    ...buildMemoEvents(options),
  }

}