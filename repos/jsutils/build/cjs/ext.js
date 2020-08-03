'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isArr = require('./isArr-39234014.js');
var isObj = require('./isObj-6b3aa807.js');
var isFunc = require('./isFunc-f93803cb.js');
var isStr = require('./isStr-8a57710e.js');
require('./toStr-8e499966.js');
require('./isBool-aa6af74e.js');
require('./toBool-cfb8a7ec.js');
var softFalsy = require('./softFalsy-3d7ead1c.js');
var isNum = require('./isNum-c7164b50.js');
require('./toNum-990ff777.js');
var typeOf = require('./typeOf-51fe5771.js');
var strToType = require('./strToType-23818aee.js');

const either = (val1, val2, check) => !isFunc.isFunc(check) ? softFalsy.softFalsy(val1) && val1 || val2 : check(val1, val2) && val1 || val2;

const isEmpty = val => isObj.isObj(val) ? Object.keys(val).length === 0 : isArr.isArr(val) ? val.length === 0 : isStr.isStr(val) ? val.trim().length === 0 : isNum.isNum(val) ? val < 1 : false;

const isSame = (val1, val2) => val1 === val2 ? val1 !== 0 || 1 / val1 === 1 / val2 : val1 !== val1 && val2 !== val2;

const isValidDate = date => !isNaN((date instanceof Date && date || new Date(date)).getTime());

const exists = value => value === value && value !== undefined && value !== null;

exports.typeOf = typeOf.typeOf;
exports.strToType = strToType.strToType;
exports.either = either;
exports.exists = exists;
exports.isEmpty = isEmpty;
exports.isSame = isSame;
exports.isValidDate = isValidDate;
