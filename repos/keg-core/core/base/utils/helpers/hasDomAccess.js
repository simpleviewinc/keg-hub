/**
 * Checks if there is access to the window and dom
 */
export const hasDomAccess = () => {
  try {
    return !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )
  }
 catch (error) {
    return false
  }
}
