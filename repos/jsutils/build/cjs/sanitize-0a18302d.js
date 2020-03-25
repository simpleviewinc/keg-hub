'use strict';

var isStr = require('./isStr-8a57710e.js');

const sanitize = str => isStr.isStr(str) && str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') || str;

exports.sanitize = sanitize;
