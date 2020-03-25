/** @module number */

import { equalsNaN } from './equalsNaN'
import { isNum } from './isNum'
import { getNums } from './getNums'
import { toNum } from './toNum'

/**
 * Finds the number ext base on the passed in number.
 * @example
 * nth(1)
 * // Returns 'st'
 * @example
 * nth(2)
 * // Returns 'nd'
 * @example
 * nth(5)
 * // Returns 'th'
 * @function
 * @param {number} num - value to check
 * @return {string} ext of the number
 */
export const nth = num => {

  if(!isNum(num)){
    num = getNums(num)
    if(!num) return ''
    num = toNum(num)
    if(equalsNaN(num)) return ''
  }

  const mod = (num % 100)
  if (mod >= 10 && mod <= 20)
    return 'th'

  switch(num % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
