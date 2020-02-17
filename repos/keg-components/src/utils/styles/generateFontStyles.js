const hasDom = typeof window !== 'undefined'
const addedFonts = []

/**
 * Adds a font-face rule to the document head
 * Keeps track of the what fonts have been added
 * So they don't get added more then once
 * @param {string} name - Name of the font-family ( i.e. FontAwesome )
 * @param {string} uri - Path to the font file ( i.e. node_modules/font-awesome/FontAwesome.ttf )
 *
 * @return {void}
 */
export const generateFontStyles = (name, uri) => {
  if(!hasDom || addedFonts.indexOf(name) !== -1) return

  addedFonts.push(name)

  const fontStyles = `@font-face {
    src: url(${uri});
    font-family: ${name};
  }`

  const style = document.createElement('style')
  style.type = 'text/css'

  style.styleSheet
    ? ( style.styleSheet.cssText = fontStyles )
    : style.appendChild( document.createTextNode( fontStyles ))

  // Inject stylesheet
  document.head.appendChild(style)
}


