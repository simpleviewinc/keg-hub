'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var React = require('react');
var React__default = _interopDefault(React);
require('./ensureClassArray.js');
var handleRefUpdate = require('./handleRefUpdate.js');
var updateClassNames = require('./updateClassNames.js');

var useScrollClassName = function useScrollClassName(defClass, className, innerClassName, ref) {
  className = jsutils.eitherArr(className, [className]);
  var classRef = React.useRef(className);
  return React.useCallback(function (nativeObject) {
    var scrollResponder = nativeObject && jsutils.isFunc(nativeObject.getScrollResponder) ? nativeObject.getScrollResponder() : nativeObject;
    if ( scrollResponder) {
      jsutils.isFunc(scrollResponder.getScrollableNode) && updateClassNames.updateClassNames(scrollResponder.getScrollableNode(), classRef, defClass, className);
      jsutils.isFunc(scrollResponder.getInnerViewNode) && updateClassNames.updateClassNames(scrollResponder.getInnerViewNode(), classRef, "".concat(defClass, "-container"), innerClassName);
    }
    handleRefUpdate.handleRefUpdate(ref, nativeObject);
  }, [defClass, className.join(' '), ref]);
};

exports.useScrollClassName = useScrollClassName;
//# sourceMappingURL=useScrollClassName.js.map
