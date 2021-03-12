import './validate-0eec5ac6.js';
import { i as isArr } from './isArr-a4420764.js';
import './match-61fbd7dc.js';
import { i as isStr } from './isStr-481ce69b.js';

const isRegex = val => Boolean(val && val instanceof RegExp);

const getRegexSource = maybeRx => isRegex(maybeRx) ? maybeRx.source : isStr(maybeRx) ? maybeRx : null;

const parseArgs = args => {
  if (isArr(args[0])) return [args[0], args[1]];
  const last = args[args.length - 1];
  const options = isStr(last) ? last : undefined;
  const expressions = options ? args.splice(0, args.length - 1) : args;
  return [expressions, options];
};
const joinRegex = (...args) => {
  const [expressions, options] = parseArgs(args);
  const source = expressions.reduce((joined, next) => {
    const nextSource = getRegexSource(next);
    return !nextSource ? joined : joined === '' ? nextSource : `${joined}|${nextSource}`;
  }, '');
  return new RegExp(`(${source})`, options);
};

export { getRegexSource as g, isRegex as i, joinRegex as j };
//# sourceMappingURL=joinRegex-b645166a.js.map
