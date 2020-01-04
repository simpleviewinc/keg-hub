export const getPressHandler = (isWeb, onClick, onPress) => {
  return { [ isWeb ? 'onClick' : 'onPress' ]: onClick || onPress }
}
