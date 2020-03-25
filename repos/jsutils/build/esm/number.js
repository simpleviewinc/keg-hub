import { i as isNum, e as equalsNaN } from './isNum-cc6ad9ca.js';
export { e as equalsNaN, i as isNum } from './isNum-cc6ad9ca.js';
export { i as isNonNegative } from './isNonNegative-76ec0014.js';
import './isStr-481ce69b.js';
import './toStr-0e5fe94c.js';
import { g as getNums, t as toNum } from './toNum-537197a6.js';
export { g as getNums, t as toNum } from './toNum-537197a6.js';

const isFloat = val => isNum(val) && val % 1 !== 0;

const isInt = val => isNum(val) && val % 1 === 0;

const nth = num => {
  if (!isNum(num)) {
    num = getNums(num);
    if (!num) return '';
    num = toNum(num);
    if (equalsNaN(num)) return '';
  }
  const mod = num % 100;
  if (mod >= 10 && mod <= 20) return 'th';
  switch (num % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const toFloat = val => val && !equalsNaN(val) && parseFloat(isNum(val) && val || getNums(val)) || 0;

const toInt = val => val && !equalsNaN(val) && parseInt(isNum(val) && val || getNums(val)) || 0;

export { isFloat, isInt, nth, toFloat, toInt };
