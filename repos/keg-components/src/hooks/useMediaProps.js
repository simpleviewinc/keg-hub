import { useMemo } from 'react'
import { isValidComponent } from 'KegUtils'
import {
  get,
  reduceObj,
  isStr,
  deepMerge,
  isObj,
  noOpObj,
} from '@keg-hub/jsutils'

const getMediaType = (mediaTypes, styles) => {
  return mediaTypes
    ? reduceObj(
        mediaTypes,
        (key, value, mediaData) => {
          return !mediaData.type && value
            ? {
                type: key,
                media: value,
                styles: !isObj(styles) ? styles : styles.media,
              }
            : mediaData
        },
        {}
      )
    : noOpObj
}

export const useMediaProps = ({ Media, image, video, styles }) => {
  return useMemo(() => {
    const { type, media, styles: mediaStyles } = getMediaType(
      { Media, image, video },
      styles
    )

    // If no media, or media is a component, don't return any props
    return !Boolean(media) || isValidComponent(media)
      ? null
      : // If media is a string, we assume its a url / source to media
      isStr(media)
        ? {
            type,
            src: media,
            styles: {
            // Add loading styles for media from theme
              loading: styles.loading,
              // Add all media styles from theme
              ...mediaStyles,
            },
          }
        : // Otherwise, it's assumed media is an object
          {
            type,
            ...media,
            styles: deepMerge(
            // Add loading styles for media from theme
              { loading: styles.loading },
              // Add all media styles from theme
              mediaStyles,
              // Add passed in styles from user, only when media is an object
              get(media, 'style', {})
            ),
          }
  }, [ Media, image, video, styles ])
}
