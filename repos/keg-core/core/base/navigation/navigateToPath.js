/**
 * @summary Navigates to the given path via react-router
 * @param {String} path - path to route to
 * @param {Object} history - history object from react-router
 *
 * @return { Object } - {success, message}
 */
export const navigateToPath = (path, history) => {
  let success = false
  let message = ''

  // attempt to navigate
  try {
    if (history && path) {
      history.push(path)
      success = true
    }
    else {
      success = false
      message = 'History/Path not found'
    }
  }
  catch (err) {
    success = false
    message = err.message
  }

  return {
    success,
    message,
  }
}
