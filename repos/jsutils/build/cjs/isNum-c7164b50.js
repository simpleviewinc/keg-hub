'use strict';

const equalsNaN = val => typeof val === 'number' && val != val;

const isNum = val => typeof val === 'number' && !equalsNaN(val);

exports.equalsNaN = equalsNaN;
exports.isNum = isNum;
