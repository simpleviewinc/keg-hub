"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// Test helper to test loading a function
module.exports = jest.fn((data1, data2, data3) => {
  return _extends({
    key: "I am a test object"
  }, data1);
});