import { v as validate } from './validate-0eec5ac6.js';
import { i as isArr } from './isArr-a4420764.js';
import { i as isFunc } from './isFunc-40ceeef8.js';
import { d as deepFreeze } from './deepFreeze-0437aacd.js';
import { i as isStr } from './isStr-481ce69b.js';
import { i as isNum } from './isNum-cc6ad9ca.js';
import { i as isBool } from './isBool-4d844d9e.js';
import { t as typeOf } from './typeOf-8c86a991.js';

const noOp = () => {};
const noOpObj = Object.freeze({});
const noPropObj = deepFreeze({
  content: {}
});
const noPropArr = deepFreeze([]);

const isOrderable = x => isStr(x) || isNum(x) || isBool(x);

const compareTo = (x, y) => {
  const [valid] = validate({
    x,
    y
  }, {
    $default: isOrderable
  });
  if (!valid) return null;
  return isStr(x) ? x.localeCompare(y) : x - y;
};

const identity = x => x;

const match = (matchArg, ...args) => {
  if (!args.length) return null;
  for (let entry of args) {
    if (!isArr(entry)) {
      console.error(`Matching case must be an entry (a 2-element array). Found: ${typeOf(entry)}`, entry);
      break;
    }
    const [caseValueOrPredicate, valueOnMatch] = entry;
    if (isFunc(caseValueOrPredicate) && caseValueOrPredicate(matchArg)) return valueOnMatch;
    if (caseValueOrPredicate === matchArg) return valueOnMatch;
  }
  return null;
};
match.default = () => true;

export { identity as a, noOpObj as b, compareTo as c, noPropObj as d, noPropArr as e, isOrderable as i, match as m, noOp as n };
//# sourceMappingURL=match-312736a1.js.map
