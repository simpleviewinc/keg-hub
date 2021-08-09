import { i as isStr } from './isStr-481ce69b.js';
import { i as isNum } from './isNum-cc6ad9ca.js';
import { i as isBool } from './isBool-4d844d9e.js';
import { v as validate } from './validate-0a7295ee.js';

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

export { identity as a, compareTo as c, isOrderable as i };
//# sourceMappingURL=identity-3f419fcd.js.map
