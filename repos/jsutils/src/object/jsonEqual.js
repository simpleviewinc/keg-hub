/** @module object */

/**
 * Compares two objects by converting to JSON, and checking string equality.
 * @function
 * @param { object | array } one - object to compare with param two
 * @param { object | array } two - object to compare with param one
 * @return {boolean} status of equality
 */
export const jsonEqual = (one, two) => {
  try {
    return JSON.stringify(one) === JSON.stringify(two)
  }
  catch(e){
    return false
  }
}
