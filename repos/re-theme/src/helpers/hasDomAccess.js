/**
 * Checks if there is access to the dom
 */
export const hasDomAccess = () =>
  !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
