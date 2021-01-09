import { isArr, isNum, trainCase, noOpObj, checkCall } from '@keg-hub/jsutils'

let __transition
export const clearTransitionStyles = () => (__transition = undefined)

export const transition = (config = noOpObj) => {
  if (__transition) return __transition

  __transition = (prop = 'all', amount = '1s', type = 'ease') => {
    prop = isArr(prop) ? prop : [prop]
    amount = (isNum(amount) && `${amount}s`) || amount

    return {
      transitionProperty: prop.map(trainCase),
      transitionDuration: amount,
      transitionTimingFunction: type,
    }
  }

  __transition.move = (amount = 1, type = 'ease') => ({
    transition: `transform ${amount}s ${type}`,
  })

  __transition.opacity = (amount = 1, type = 'ease') => ({
    transition: `opacity ${amount}s ${type}`,
  })

  __transition.maxHeight = {
    overflow: 'hidden',
    transition: 'max-height 1s ease',
  }

  return (
    checkCall(config.transition, __transition) ||
    Object.assign(__transition, config.transition)
  )
}
