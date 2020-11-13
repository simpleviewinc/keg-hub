'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');

var getImgSrc = function getImgSrc(isWeb, src, source, uri) {
  var imgSrc = src || source || uri;
  var key = isWeb ? 'src' : 'source';
  return _rollupPluginBabelHelpers._defineProperty({}, key, isWeb ? jsutils.isObj(imgSrc) ? imgSrc.uri : imgSrc : jsutils.isStr(imgSrc) ? {
    uri: imgSrc
  } : imgSrc);
};

exports.getImgSrc = getImgSrc;
//# sourceMappingURL=getImgSrc.js.map
