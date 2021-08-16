'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var reStyle = require('@keg-hub/re-theme/reStyle');
var view = require('./view-3fcb25db.js');
require('./view.native-895f9104.js');
require('react');
require('react-native-web');
require('./useClassName-eec4a5f1.js');
require('./updateClassNames.js');
require('./ensureClassArray.js');
require('@keg-hub/jsutils');
require('./handleRefUpdate.js');
require('@keg-hub/re-theme/styleInjector');

var SelectView = reStyle.reStyle(view.View)(function (_, props) {
  return _rollupPluginBabelHelpers._objectSpread2({
    height: props.height
  }, {
    display: props.visible ? 'block' : 'none',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  } );
});

exports.SelectView = SelectView;
//# sourceMappingURL=selectView.js.map
