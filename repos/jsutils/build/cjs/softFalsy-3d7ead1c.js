'use strict';

const softFalsy = val => Boolean(val || val === '' || val === 0);

exports.softFalsy = softFalsy;
