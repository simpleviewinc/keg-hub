export const getChecked = (isWeb, checked, value) => {
  return { [ isWeb && 'checked' || 'value' ]: checked || value }
}