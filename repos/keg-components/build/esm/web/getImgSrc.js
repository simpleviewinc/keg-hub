import { a as _defineProperty } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { isObj, isStr } from '@keg-hub/jsutils';

var getImgSrc = function getImgSrc(isWeb, src, source, uri) {
  var imgSrc = src || source || uri;
  var key = isWeb ? 'src' : 'source';
  return _defineProperty({}, key, isWeb ? isObj(imgSrc) ? imgSrc.uri : imgSrc : isStr(imgSrc) ? {
    uri: imgSrc
  } : imgSrc);
};

export { getImgSrc };
//# sourceMappingURL=getImgSrc.js.map
