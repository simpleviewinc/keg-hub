'use strict';

var isNum = require('./isNum-c7164b50.js');
var toBool = require('./toBool-cb75ca6a.js');
var isStr = require('./isStr-8a57710e.js');
var toNum = require('./toNum-eeb2e51e.js');

const strToType = val => {
  return !val || !isStr.isStr(val) ? val : toBool.isStrBool(val) ? toBool.toBool(val) : isNum.isNum(val) ? toNum.toNum(val) : (() => {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  })();
};

exports.strToType = strToType;
