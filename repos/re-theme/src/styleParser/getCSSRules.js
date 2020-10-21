/**
 * Helper for warnOfError
 * @param {*} error 
 * @returns {boolean} true if the input is a DOMException Security Error
 */
const isSecurityError = error => {
  return error instanceof DOMException
    && error.name?.includes('SecurityError')
}

/**
 * Helper for getCSSRules - handles the error arising from getting 
 * stylesheet cssRules property
 * @param {Object} stylesheet 
 * @param {Error} error 
 */
const warnOfStylesheetError = (stylesheet, error) => {
  if (isSecurityError(error)) {
    console.warn(
      'Cannot parse cross-origin restricted stylesheet from source:',
      stylesheet?.href,
      '\nThis stylesheet will be safely ignored, but if you need access to it, then you should either ensure the domains match or adjust the stylesheet server\'s security policy.'
    )
  }
  else {
    console.warn(
      'Cannot parse stylesheet from source:',
      stylesheet?.href,
      `\n Reason: ${error.name} - ${error.message}`, 
    )
  }
}

/**
 * Safely returns the css rules from the stylesheet object,
 * handling any errors that might arise from that and 
 * logging them to the console. If an error arose,
 * or if the stylesheet is falsy, this returns an empty array
 * @param {*} stylesheet 
 * @return {Array<CSSStyleRule>}
 */
export const getCSSRules = stylesheet => {
  try {
    return stylesheet
      ? stylesheet.cssRules
      : []
  }
  catch (e) {
    warnOfStylesheetError(stylesheet, e)
  }

  return []
}