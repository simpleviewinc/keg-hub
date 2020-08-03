import './isStr-481ce69b.js';
import './toStr-0e5fe94c.js';
import { i as isNum, e as equalsNaN } from './isNum-cc6ad9ca.js';
export { e as equalsNaN, i as isNum } from './isNum-cc6ad9ca.js';
import { g as getNums, t as toNum } from './toNum-db57d125.js';
export { g as getNums, t as toNum } from './toNum-db57d125.js';

const isNonNegative = val => isNum(val) && val >= 0;

const isNegative = x => isNum(x) && x < 0;

const isPositive = x => isNum(x) && x > 0;

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

export { isFloat, isInt, isNegative, isNonNegative, isPositive, nth, toFloat, toInt };
