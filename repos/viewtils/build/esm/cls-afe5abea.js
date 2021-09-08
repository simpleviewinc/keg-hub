import { isArr } from '@keg-hub/jsutils';

const hasOwn = {}.hasOwnProperty;
const cls = (...args) => {
  const classes = [];
  for (var i = 0; i < args.length; i++) {
    const arg = args[i];
    if (!arg) continue;
    const argType = typeof arg;
    if (argType === 'string' || argType === 'number') classes.push(arg);else if (isArr(arg) && arg.length) {
      const inner = classes(...arg);
      inner && classes.push(inner);
    } else if (argType === 'object') {
      for (const key in arg) {
        hasOwn.call(arg, key) && arg[key] && classes.push(key);
      }
    }
  }
  return cls.join(' ');
};

export { cls as c };
//# sourceMappingURL=cls-afe5abea.js.map
