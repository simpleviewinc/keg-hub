import { isFunc } from 'jsutils'

export const getPressHandler = (isWeb, onClick, onPress) => {
  const action = onClick || onPress
  return (
    (isFunc(action) && {
      [isWeb ? 'onClick' : 'onPress']: onClick || onPress,
    }) ||
    {}
  )
}
