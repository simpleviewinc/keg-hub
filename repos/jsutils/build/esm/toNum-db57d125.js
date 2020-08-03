import { t as toStr } from './toStr-0e5fe94c.js';
import { i as isNum, e as equalsNaN } from './isNum-cc6ad9ca.js';

const getNums = val => toStr(val).replace(/([^.\d])/gm, '');

const toNum = val => isNum(val) ? val : val && !equalsNaN(val) && Number(getNums(val)) || 0;

export { getNums as g, toNum as t };
