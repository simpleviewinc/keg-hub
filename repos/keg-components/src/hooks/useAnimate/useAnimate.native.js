import { useRef } from 'react'
export const useAnimate = ({ ref, animation, config, startCb, startDelay }) => {
  const aniRef = useRef(ref)
  console.warn('useAnimate not implemented on native')

  return [aniRef]
}
