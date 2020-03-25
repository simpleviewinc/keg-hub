import { i as isArr } from './isArr-a4420764.js';
import { i as isFunc } from './isFunc-40ceeef8.js';

const applyToFunc = (item, expression) => {
  if (isArr(expression)) {
    const [func, ...args] = expression;
    return func(item, ...args);
  } else if (isFunc(expression)) {
    return expression(item);
  } else {
    console.error(`Pipeline expected either a function or an array (for function expressions). Found ${typeof expression}`);
    return item;
  }
};

const pipeline = (item, ...functions) => {
  return functions.reduce((result, fn) => applyToFunc(result, fn), item);
};

const hasOwn = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

export { applyToFunc as a, hasOwn as h, pipeline as p };
