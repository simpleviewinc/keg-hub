import { isArr, isNum, trainCase } from 'jsutils'

export const transition = (prop = 'all', amount = '1s', type = 'ease') => {
  prop = (isArr(prop) && prop.join(', ')) || prop
  amount = (isNum(amount) && `${amount}s`) || amount

  return {
    transitionProperty: trainCase(prop),
    transitionDuration: amount,
    transitionTimingFunction: type,
  }
}

transition.move = (amount = 1, type = 'ease') => ({
  transition: `transform ${amount}s ${type}`,
})
transition.opacity = (amount = 1, type = 'ease') => ({
  transition: `opacity ${amount}s ${type}`,
})

transition.maxHeight = {
  overflow: 'hidden',
  transition: 'max-height 1s ease',
}
