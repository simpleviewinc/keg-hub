'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('./ensureClassArray.js');
require('./handleRefUpdate.js');
require('./updateClassNames.js');
require('react-native');
require('./useClassName-a237c005.js');
require('@keg-hub/re-theme/styleInjector');
require('./useTextAccessibility.js');
require('./kegText.native-b0c7697d.js');
require('@keg-hub/re-theme');
require('./useTextStyles.js');
var kegText = require('./kegText-e909e94a.js');

var Paragraph = kegText.KegText('paragraph');
var P = function P(props) {
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Paragraph, props), '\n');
};

exports.P = P;
//# sourceMappingURL=p.js.map
