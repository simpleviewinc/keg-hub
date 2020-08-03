import { t as toStr } from './toStr-0e5fe94c.js';
import { i as isBool } from './isBool-4d844d9e.js';

const isStrBool = val => val === 'false' || val === 'true';

const convertToStrBool = val => isBool(val) ? toStr(val) : !val || val === 'false' || val === '0' ? 'false' : 'true';

const toBool = val => isStrBool(val) ? val === 'true' : convertToStrBool(val) === 'true';

export { convertToStrBool as c, isStrBool as i, toBool as t };
