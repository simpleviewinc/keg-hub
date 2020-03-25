'use strict';

const isObj = obj => typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

exports.isObj = isObj;
