'use strict';

var isArr = require('./isArr-39234014.js');
var isFunc = require('./isFunc-f93803cb.js');
var deepFreeze = require('./deepFreeze-d73ccc57.js');
var typeOf = require('./typeOf-51fe5771.js');

const noOp = () => {};
const noOpObj = Object.freeze({});
const noPropObj = deepFreeze.deepFreeze({
  content: {}
});
const noPropArr = deepFreeze.deepFreeze([]);

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

exports.match = match;
exports.noOp = noOp;
exports.noOpObj = noOpObj;
exports.noPropArr = noPropArr;
exports.noPropObj = noPropObj;
//# sourceMappingURL=match-937d87ee.js.map
