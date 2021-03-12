'use strict';

var validate = require('./validate-500f268a.js');
var isStr = require('./isStr-8a57710e.js');
var isNum = require('./isNum-c7164b50.js');
var isBool = require('./isBool-aa6af74e.js');

const isOrderable = x => isStr.isStr(x) || isNum.isNum(x) || isBool.isBool(x);

const compareTo = (x, y) => {
  const [valid] = validate.validate({
    x,
    y
  }, {
    $default: isOrderable
  });
  if (!valid) return null;
  return isStr.isStr(x) ? x.localeCompare(y) : x - y;
};

const identity = x => x;

exports.compareTo = compareTo;
exports.identity = identity;
exports.isOrderable = isOrderable;
//# sourceMappingURL=identity-c14fb27a.js.map
