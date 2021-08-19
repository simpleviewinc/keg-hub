'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-95f0bff4.js');
var React = require('react');
var jsutils = require('@keg-hub/jsutils');
var isValidComponent = require('./isValidComponent.js');
require('@keg-hub/re-theme/colors');

var getMediaType = function getMediaType(mediaTypes, styles) {
  return mediaTypes ? jsutils.reduceObj(mediaTypes, function (key, value, mediaData) {
    return !mediaData.type && value ? {
      type: key,
      media: value,
      styles: !jsutils.isObj(styles) ? styles : styles.media
    } : mediaData;
  }, {}) : jsutils.noOpObj;
};
var useMediaProps = function useMediaProps(_ref) {
  var Media = _ref.Media,
      image = _ref.image,
      video = _ref.video,
      styles = _ref.styles;
  return React.useMemo(function () {
    var _getMediaType = getMediaType({
      Media: Media,
      image: image,
      video: video
    }, styles),
        type = _getMediaType.type,
        media = _getMediaType.media,
        mediaStyles = _getMediaType.styles;
    return !Boolean(media) || isValidComponent.isValidComponent(media) ? null :
    jsutils.isStr(media) ? {
      type: type,
      src: media,
      styles: _rollupPluginBabelHelpers._objectSpread2({
        loading: styles.loading
      }, mediaStyles)
    } :
    _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({
      type: type
    }, media), {}, {
      styles: jsutils.deepMerge(
      {
        loading: styles.loading
      },
      mediaStyles,
      jsutils.get(media, 'style', {}))
    });
  }, [Media, image, video, styles]);
};

exports.useMediaProps = useMediaProps;
//# sourceMappingURL=useMediaProps.js.map
