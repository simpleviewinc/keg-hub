'use strict';

var isNum = require('./isNum-c7164b50.js');
var toNum = require('./toNum-eeb2e51e.js');

const isNegative = x => isNum.isNum(x) && x < 0;

const isPositive = x => isNum.isNum(x) && x > 0;

const isFloat = val => isNum.isNum(val) && val % 1 !== 0;

const isInt = val => isNum.isNum(val) && val % 1 === 0;

const nth = num => {
  if (!isNum.isNum(num)) {
    num = toNum.getNums(num);
    if (!num) return '';
    num = toNum.toNum(num);
    if (isNum.equalsNaN(num)) return '';
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

const toFloat = val => val && !isNum.equalsNaN(val) && parseFloat(isNum.isNum(val) && val || toNum.getNums(val)) || 0;

const toInt = val => val && !isNum.equalsNaN(val) && parseInt(isNum.isNum(val) && val || toNum.getNums(val)) || 0;

const mod = (num, divisor) => {
  return (num % divisor + divisor) % divisor;
};

exports.isFloat = isFloat;
exports.isInt = isInt;
exports.isNegative = isNegative;
exports.isPositive = isPositive;
exports.mod = mod;
exports.nth = nth;
exports.toFloat = toFloat;
exports.toInt = toInt;
//# sourceMappingURL=mod-f28fb585.js.map
