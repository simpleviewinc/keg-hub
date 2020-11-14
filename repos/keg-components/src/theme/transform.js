import { deepMerge, noOpObj } from '@keg-hub/jsutils'

export const transform = (config=noOpObj) => {
  return deepMerge({
    rotate: {
      at: amount => ({ transform: `rotate(${amount}deg)` }),
      45: { transform: 'rotate(45deg)' },
      90: { transform: 'rotate(90deg)' },
      180: { transform: 'rotate(180deg)' },
      270: { transform: 'rotate(270deg)' },
    },
  }, config.transform)
}
