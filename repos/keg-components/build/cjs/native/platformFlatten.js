'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-1d0a0e6a.js');
var jsutils = require('@keg-hub/jsutils');
var getPlatform = require('./getPlatform-24228c6c.js');

var allPlatforms = "$all";
var platform = "$" + getPlatform.getPlatform();
var nonPlatform =  "$web" ;
var platforms = [allPlatforms, platform, nonPlatform];
var mergePlatforms = function mergePlatforms(toMerge) {
  var $all = toMerge.$all,
      $web = toMerge.$web,
      $native = toMerge.$native,
      otherKeys = _rollupPluginBabelHelpers._objectWithoutProperties(toMerge, ["$all", "$web", "$native"]);
  return platforms.reduce(function (merged, plat) {
    var platStyles = plat !== nonPlatform && jsutils.get(toMerge, [plat]);
    return platStyles ? jsutils.deepMerge(merged, platStyles) : merged;
  }, otherKeys);
};
var platformFlatten = function platformFlatten(initial) {
  var hasPlatforms = Object.keys(initial).some(function (key) {
    return platforms.indexOf(key) !== -1;
  });
  var noPlatforms = hasPlatforms && mergePlatforms(initial) || _rollupPluginBabelHelpers._objectSpread2({}, initial);
  return jsutils.reduceObj(noPlatforms, function (key, value, merged) {
    merged[key] = jsutils.isObj(value) ? platformFlatten(value) : value;
    return merged;
  }, noPlatforms);
};

exports.platformFlatten = platformFlatten;
//# sourceMappingURL=platformFlatten.js.map
