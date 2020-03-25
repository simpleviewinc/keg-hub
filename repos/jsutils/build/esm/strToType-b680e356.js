import { i as isNum } from './isNum-cc6ad9ca.js';
import { i as isStrBool, t as toBool } from './toBool-32bfbbdb.js';
import { i as isStr } from './isStr-481ce69b.js';
import { t as toNum } from './toNum-537197a6.js';

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
