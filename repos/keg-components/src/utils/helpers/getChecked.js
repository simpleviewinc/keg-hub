export const getChecked = (isWeb, isChecked) => {
  return { [isWeb ? 'checked' : 'value']: isChecked }
}
