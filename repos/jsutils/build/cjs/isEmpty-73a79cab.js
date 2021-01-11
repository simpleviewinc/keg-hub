'use strict';

var isArr = require('./isArr-39234014.js');
var isObj = require('./isObj-6b3aa807.js');
var isStr = require('./isStr-8a57710e.js');
var isNum = require('./isNum-c7164b50.js');

const isEmpty = val => isObj.isObj(val) ? Object.keys(val).length === 0 : isArr.isArr(val) ? val.length === 0 : isStr.isStr(val) ? val.trim().length === 0 : isNum.isNum(val) ? val < 1 : false;

exports.isEmpty = isEmpty;
//# sourceMappingURL=isEmpty-73a79cab.js.map
