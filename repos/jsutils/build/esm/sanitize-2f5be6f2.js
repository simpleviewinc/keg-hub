import { i as isStr } from './isStr-481ce69b.js';

const sanitize = str => isStr(str) && str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || str;

export { sanitize as s };
