import { _ as _objectSpread2 } from './_rollupPluginBabelHelpers-b6f65682.js';
import { useMemo } from 'react';
import { reduceObj, isObj, noOpObj, isStr, deepMerge, get } from '@keg-hub/jsutils';
import { isValidComponent } from './isValidComponent.js';
import '@keg-hub/re-theme/colors';

var getMediaType = function getMediaType(mediaTypes, styles) {
  return mediaTypes ? reduceObj(mediaTypes, function (key, value, mediaData) {
    return !mediaData.type && value ? {
      type: key,
      media: value,
      styles: !isObj(styles) ? styles : styles.media
    } : mediaData;
  }, {}) : noOpObj;
};
var useMediaProps = function useMediaProps(_ref) {
  var Media = _ref.Media,
      image = _ref.image,
      video = _ref.video,
      styles = _ref.styles;
  return useMemo(function () {
    var _getMediaType = getMediaType({
      Media: Media,
      image: image,
      video: video
    }, styles),
        type = _getMediaType.type,
        media = _getMediaType.media,
        mediaStyles = _getMediaType.styles;
    return !Boolean(media) || isValidComponent(media) ? null :
    isStr(media) ? {
      type: type,
      src: media,
      styles: _objectSpread2({
        loading: styles.loading
      }, mediaStyles)
    } :
    _objectSpread2(_objectSpread2({
      type: type
    }, media), {}, {
      styles: deepMerge(
      {
        loading: styles.loading
      },
      mediaStyles,
      get(media, 'style', {}))
    });
  }, [Media, image, video, styles]);
};

export { useMediaProps };
//# sourceMappingURL=useMediaProps.js.map
