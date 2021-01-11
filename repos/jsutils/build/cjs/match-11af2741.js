'use strict';

var validate = require('./validate-500f268a.js');
var isArr = require('./isArr-39234014.js');
var isFunc = require('./isFunc-f93803cb.js');
var deepFreeze = require('./deepFreeze-d73ccc57.js');
var isStr = require('./isStr-8a57710e.js');
var isNum = require('./isNum-c7164b50.js');
var isBool = require('./isBool-aa6af74e.js');
var typeOf = require('./typeOf-51fe5771.js');

const noOp = () => {};
const noOpObj = Object.freeze({});
const noPropObj = deepFreeze.deepFreeze({
  content: {}
});
const noPropArr = deepFreeze.deepFreeze([]);

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

const match = (matchArg, ...args) => {
  if (!args.length) return null;
  for (let entry of args) {
    if (!isArr.isArr(entry)) {
      console.error(`Matching case must be an entry (a 2-element array). Found: ${typeOf.typeOf(entry)}`, entry);
      break;
    }
    const [caseValueOrPredicate, valueOnMatch] = entry;
    if (isFunc.isFunc(caseValueOrPredicate) && caseValueOrPredicate(matchArg)) return valueOnMatch;
    if (caseValueOrPredicate === matchArg) return valueOnMatch;
  }
  return null;
};
match.default = () => true;

exports.compareTo = compareTo;
exports.identity = identity;
exports.isOrderable = isOrderable;
exports.match = match;
exports.noOp = noOp;
exports.noOpObj = noOpObj;
exports.noPropArr = noPropArr;
exports.noPropObj = noPropObj;
//# sourceMappingURL=match-11af2741.js.map
