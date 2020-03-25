'use strict';

var isStr = require('./isStr-8a57710e.js');

const toStr = val => val === null || val === undefined ? '' : isStr.isStr(val) ? val : JSON.stringify(val);

exports.toStr = toStr;
