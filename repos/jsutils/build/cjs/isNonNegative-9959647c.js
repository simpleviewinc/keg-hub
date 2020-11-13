'use strict';

var isNum = require('./isNum-c7164b50.js');

const isNonNegative = val => isNum.isNum(val) && val >= 0;

exports.isNonNegative = isNonNegative;
//# sourceMappingURL=isNonNegative-9959647c.js.map
