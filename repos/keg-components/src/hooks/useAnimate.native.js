import { useEffect, useRef } from 'react'
import { checkCall } from 'jsutils'
export const useAnimate = ({ ref, animation, config, startCb, startDelay }) => {
  const aniRef = useRef(ref)
  console.warn('useAnimate not implemented on native')

  return [ aniRef ]
};
