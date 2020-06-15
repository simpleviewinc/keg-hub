export const getOnChangeHandler = (isWeb, onChange, onValueChange) => {
  return { [isWeb ? 'onChange' : 'onValueChange']: onChange || onValueChange }
}
