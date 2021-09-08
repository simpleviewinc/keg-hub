import { isArr, isStr, isNum } from '@keg-hub/jsutils'

/**
 * Builds a CSS transition rule
 * @param {Array} [props=[]] - CSS rules to have the transition applied to
 * @param {number} [speed=250] - Speed of the transition
 * @param {string} [timingFunc='ease'] - Type of transition animation to use
 *
 * @returns {Object} - Built CSS transition rule
 */
export const transition = (props = [], speed = 250, timingFunc = 'ease') => {
  speed = isNum(speed) ? `${speed}ms` : isStr(speed) ? speed : `250ms`

  return isStr(props)
    ? { transition: `${props} ${speed} ${timingFunc}` }
    : isArr(props)
      ? {
          transition: props
            .reduce((trans, prop) => {
              trans.push(`${prop} ${speed} ${timingFunc}`)
              return trans
            }, [])
            .join(', '),
        }
      : null
}
