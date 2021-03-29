'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var kegText = require('./kegText-965ef4d3.js');
require('./_rollupPluginBabelHelpers-bb55ccbe.js');
require('@keg-hub/jsutils');
require('./kegText.js');
require('./useClassName.native-3d1a229b.js');
require('react-native');
require('./useTextAccessibility.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextStyles.js');
require('@keg-hub/re-theme');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Paragraph = kegText.KegText('paragraph');
var P = function P(props) {
  return React__default['default'].createElement(React__default['default'].Fragment, null, React__default['default'].createElement(Paragraph, props), '\n');
};

exports.P = P;
//# sourceMappingURL=p.js.map
