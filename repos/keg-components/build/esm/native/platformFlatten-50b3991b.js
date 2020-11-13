import { _ as _objectSpread2, d as _objectWithoutProperties } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get, deepMerge, reduceObj, isObj } from '@keg-hub/jsutils';

var platform = "native"  ;
var getPlatform = function getPlatform() {
  return platform;
};

var allPlatforms = "$all";
var platform$1 = "$" + getPlatform();
var nonPlatform =  "$web" ;
var platforms = [allPlatforms, platform$1, nonPlatform];
var mergePlatforms = function mergePlatforms(toMerge) {
  var $all = toMerge.$all,
      $web = toMerge.$web,
      $native = toMerge.$native,
      otherKeys = _objectWithoutProperties(toMerge, ["$all", "$web", "$native"]);
  return platforms.reduce(function (merged, plat) {
    var platStyles = plat !== nonPlatform && get(toMerge, [plat]);
    return platStyles ? deepMerge(merged, platStyles) : merged;
  }, otherKeys);
};
var platformFlatten = function platformFlatten(initial) {
  var hasPlatforms = Object.keys(initial).some(function (key) {
    return platforms.indexOf(key) !== -1;
  });
  var noPlatforms = hasPlatforms && mergePlatforms(initial) || _objectSpread2({}, initial);
  return reduceObj(noPlatforms, function (key, value, merged) {
    merged[key] = isObj(value) ? platformFlatten(value) : value;
    return merged;
  }, noPlatforms);
};

export { getPlatform as g, platformFlatten as p };
//# sourceMappingURL=platformFlatten-50b3991b.js.map
