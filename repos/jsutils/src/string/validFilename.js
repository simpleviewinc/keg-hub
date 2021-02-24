

/**
 * checks whether a given string is a valid filename
 * @param {string} fileName 
 * 
 * @returns {Boolean}
 */
export const validFilename = (fileName) => {
  if (!fileName) return false
  // On Unix-like systems '/' is reserved 
  // and <>:"/\|?* as well as non-printable characters \u0000-\u001F on Windows
  const regex = /[<>:"/\\|?*\u0000-\u001F]/g

  // invalid Windows filenames
  const windowsRegex = /^(con|prn|aux|nul|com\d|lpt\d)$/i

  // starts with period 
  const periodRegex = /^\.\.?$/

  return regex.test(fileName) || windowsRegex.test(fileName) || periodRegex.test(fileName)
    ? false
    : true
}