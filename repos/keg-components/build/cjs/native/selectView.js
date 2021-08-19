'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var reStyle = require('@keg-hub/re-theme/reStyle');
var view_native = require('./view.native-5d72f4dd.js');
require('react');
require('react-native');
require('./useClassName.native-3d1a229b.js');

var SelectView = reStyle.reStyle(view_native.View)(function (_, props) {
  return _rollupPluginBabelHelpers._objectSpread2({
    height: props.height
  }, {
    left: 0,
    top: 0
  });
});

exports.SelectView = SelectView;
//# sourceMappingURL=selectView.js.map
