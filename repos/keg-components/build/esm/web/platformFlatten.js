import { _ as _objectSpread2, d as _objectWithoutProperties } from './_rollupPluginBabelHelpers-b1bf0c4a.js';
import { get, deepMerge, reduceObj, isObj } from '@keg-hub/jsutils';
import { g as getPlatform } from './getPlatform-95568099.js';

var allPlatforms = "$all";
var platform = "$" + getPlatform();
var nonPlatform =  "$native";
var platforms = [allPlatforms, platform, nonPlatform];
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

export { platformFlatten };
//# sourceMappingURL=platformFlatten.js.map
