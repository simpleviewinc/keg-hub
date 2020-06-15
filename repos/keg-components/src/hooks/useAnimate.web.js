import { useEffect, useRef } from 'react'
import { isFunc } from 'jsutils'

export const useAnimate = ({ ref, animation, config, startCb, startDelay }) => {
  const aniRef = useRef(ref)

  const animate = () => {
    const element = aniRef.current
    element && isFunc(element.animate) && element.animate(animation, config)
  }

  useEffect(() => {
    const timeout = setTimeout(() => animate(), startDelay || 0)
    return () => clearTimeout(timeout)
  }, [])

  return [aniRef]
}
