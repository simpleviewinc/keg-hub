import { d as deepFreeze } from './deepFreeze-0437aacd.js';
import { i as isArr } from './isArr-a4420764.js';
import { t as typeOf } from './typeOf-8c86a991.js';
import { i as isFunc } from './isFunc-40ceeef8.js';

const noOp = () => {};
const noOpObj = Object.freeze({});
const noPropObj = deepFreeze({
  content: {}
});
const noPropArr = deepFreeze([]);

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

export { noOpObj as a, noPropObj as b, noPropArr as c, match as m, noOp as n };
//# sourceMappingURL=match-39e2fa8f.js.map
