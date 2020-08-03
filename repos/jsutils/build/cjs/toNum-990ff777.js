'use strict';

var toStr$1 = require('./toStr-8e499966.js');
var isNum = require('./isNum-c7164b50.js');

const getNums = val => toStr$1.toStr(val).replace(/([^.\d])/gm, '');

const toNum = val => isNum.isNum(val) ? val : val && !isNum.equalsNaN(val) && Number(getNums(val)) || 0;

exports.getNums = getNums;
exports.toNum = toNum;
