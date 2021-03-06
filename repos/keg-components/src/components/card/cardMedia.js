import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { Image } from 'KegImg'
import { get } from '@keg-hub/jsutils'
import { useStyle } from '@keg-hub/re-theme'

const noHeader = { marginTop: 0 }

const MediaFromType = ({ mediaProps, styles }) => {
  const {
    className,
    type,
    resizeMode = 'cover',
    resizeMethod = 'scale',
    ...props
  } = mediaProps
  const { image, video, container, loading, loadingComp } = styles

  const mediaStyles = useStyle(
    type === 'image' && image && { image },
    type === 'video' && video && { video },
    container && { container },
    loading && { loading },
    loadingComp && { loadingComp }
  )

  switch (type) {
  case 'image': {
    return (
      <Image
        resizeMode={resizeMode}
        resizeMethod={resizeMethod}
        {...props}
        className='keg-card-media'
        styles={mediaStyles}
      />
    )
  }
  default: {
    return null
  }
  }
}

export const CardMedia = ({
  hasHeader,
  mediaProps,
  Media,
  subtitle,
  styles,
  title,
}) => {
  // If no mediaProps, just return Media
  // It's either a custom component || does not exist
  // Otherwise render with the mediaProps
  return Media || !mediaProps ? (
    Media || null
  ) : (
    <View
      className='keg-card-media'
      style={[ get(styles, 'main'), hasHeader === false && noHeader ]}
    >
      <MediaFromType
        mediaProps={mediaProps}
        styles={styles}
      />
    </View>
  )
}

CardMedia.propTypes = {
  image: PropTypes.object,
  styles: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}
