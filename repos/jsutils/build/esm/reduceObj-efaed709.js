import { i as isFunc } from './isFunc-40ceeef8.js';
import { i as isObj } from './isObj-2a71d1af.js';

const reduceObj = (obj, cb, start = {}) => isObj(obj) && isFunc(cb) && Object.entries(obj).reduce((data, [key, value]) => cb(key, value, data), start) || start;

export { reduceObj as r };
//# sourceMappingURL=reduceObj-efaed709.js.map
