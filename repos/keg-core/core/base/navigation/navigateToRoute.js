/**
 * @summary Navigates to a certain route based on passed in config
 * @param {Object} history - route history from Router component
 * @param {String} path - path to navigate to
 *
 */
export const navigateToRoute = (history, path) => {
  if (history != null) {
    history.push(path)
  }
}
