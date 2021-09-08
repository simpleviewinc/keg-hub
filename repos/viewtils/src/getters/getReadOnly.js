/**
 * Checks if the passed in props equate to a disabled value
 * @param {boolean} isWeb - Is on the web platform
 * @param {boolean} readOnly - Is the component read only
 * @param {boolean} disabled - Is the component disabled
 * @param {boolean} editable - Is the component editable
 *
 * @returns {Object} key / value pair of readOnly state
 */
export const getReadOnly = (isWeb, readOnly, disabled, editable = true) => {
  const key = isWeb ? 'disabled' : 'editable'

  // Get the inverse of the props for native because editable works opposite of readOnly
  const value = isWeb
    ? readOnly || disabled || !editable
    : !(readOnly || disabled || !editable)

  return { [key]: value }
}
