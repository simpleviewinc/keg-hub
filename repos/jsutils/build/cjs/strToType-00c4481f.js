'use strict';

var isStr = require('./isStr-8a57710e.js');
var isNum = require('./isNum-c7164b50.js');
var toNum = require('./toNum-eeb2e51e.js');
var toBool = require('./toBool-deb350e4.js');

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
//# sourceMappingURL=strToType-00c4481f.js.map
