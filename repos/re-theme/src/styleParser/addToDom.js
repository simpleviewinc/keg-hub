/**
 * Appends the passed in styles to the DOM
 * @param {string} styles - Style to be added to the dom
 */
export const addToDom = styles => {

  const dataCss = document.createElement('style')

  // Based on the browser, we need to set the styles differently
  dataCss.styleSheet
    ? (dataCss.styleSheet.cssText = styles)
    : (dataCss.appendChild(document.createTextNode(styles)))

  // Add the styles to the dom
  document.getElementsByTagName("head")[0].appendChild(dataCss)

}
