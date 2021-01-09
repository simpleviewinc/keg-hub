'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./useTextAccessibility.js');
require('./kegText.js');
require('@keg-hub/re-theme/styleInjector');
require('@keg-hub/re-theme');
require('./useTextStyles.js');
var kegText$1 = require('./kegText-3f09043e.js');

var Paragraph = kegText$1.KegText('paragraph');
var P = function P(props) {
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Paragraph, props), '\n');
};

exports.P = P;
//# sourceMappingURL=p.js.map
