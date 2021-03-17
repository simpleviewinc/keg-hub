import { i as isStr } from './isStr-481ce69b.js';
import { i as isNum } from './isNum-cc6ad9ca.js';
import { t as toNum } from './toNum-537197a6.js';
import { i as isStrBool, t as toBool } from './toBool-8f49e620.js';

const strToType = val => {
  return !val || !isStr(val) ? val : isStrBool(val) ? toBool(val) : isNum(val) ? toNum(val) : (() => {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  })();
};

export { strToType as s };
//# sourceMappingURL=strToType-a1482d08.js.map
