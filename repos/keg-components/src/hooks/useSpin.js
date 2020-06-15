import { useAnimate } from 'KegAnimateHook'

const defAnimation = [
  { transform: 'rotate(0)' },
  { transform: 'rotate(360deg)' },
]

const defConfig = {
  duration: 2000,
  iterations: Infinity,
}

export const useSpin = (props = {}) => {
  let { ref, animation, config } = props
  animation = animation || defAnimation
  config = config || defConfig

  return useAnimate({
    animation,
    config,
    ref,
  })
}
