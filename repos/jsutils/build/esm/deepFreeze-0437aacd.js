import { i as isFunc } from './isFunc-40ceeef8.js';

const deepFreeze = obj => {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).map(prop => {
    obj.hasOwnProperty(prop) && obj[prop] !== null && (typeof obj[prop] === 'object' || isFunc(obj[prop])) && !Object.isFrozen(obj[prop]) && deepFreeze(obj[prop]);
  });
  return obj;
};

export { deepFreeze as d };
//# sourceMappingURL=deepFreeze-0437aacd.js.map
