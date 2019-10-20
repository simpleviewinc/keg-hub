export const hasDomAccess = () => !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
