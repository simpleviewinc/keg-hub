'use strict';

var isArr = require('./isArr-39234014.js');
var isObj = require('./isObj-6b3aa807.js');
var isFunc = require('./isFunc-f93803cb.js');
var isStr = require('./isStr-8a57710e.js');
var softFalsy = require('./softFalsy-3d7ead1c.js');
var isNum = require('./isNum-c7164b50.js');

const either = (val1, val2, check) => !isFunc.isFunc(check) ? softFalsy.softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;

const isEmpty = val => isObj.isObj(val) ? Object.keys(val).length === 0 : isArr.isArr(val) ? val.length === 0 : isStr.isStr(val) ? val.trim().length === 0 : isNum.isNum(val) ? val < 1 : false;

const isSame = (val1, val2) => val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;

const isValidDate = date => !isNaN((date instanceof Date && date || new Date(date)).getTime());

const exists = value => value === value && value !== undefined && value !== null;

exports.either = either;
exports.exists = exists;
exports.isEmpty = isEmpty;
exports.isSame = isSame;
exports.isValidDate = isValidDate;
//# sourceMappingURL=exists-1fbf0a55.js.map
