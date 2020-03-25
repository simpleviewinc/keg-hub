import { i as isStr } from './isStr-481ce69b.js';

const toStr = val => val === null || val === undefined ? '' : isStr(val) ? val : JSON.stringify(val);

export { toStr as t };
