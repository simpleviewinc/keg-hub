import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'KegView'
import { Image } from 'KegImg'
import { get } from 'jsutils'
import { useStyle } from 'KegHooks'
import { CardMediaTitle } from './cardMediaTitle'

const MediaFromType = ({ mediaProps, styles }) => {
  const { type, ...props } = mediaProps
  const { image, video, container, loading, loadingComp } = props.styles

  const mediaStyles = useStyle(
    type === 'image' && image && { image },
    type === 'video' && video && { video },
    container && { container },
    loading && { loading },
    loadingComp && { loadingComp }
  )

  switch (type) {
  case 'image': {
    return <Image
      {...props}
      styles={mediaStyles}
    />
  }
  default: {
    return null
  }
  }
}

export const CardMedia = ({ mediaProps, Media, subtitle, styles, title }) => {
  // If no mediaProps, just return Media
  // It's either a custom component || does not exist
  // Otherwise render with the mediaProps
  return Media || !mediaProps ? (
    Media || null
  ) : (
    <View style={get(styles, 'media.container')}>
      <MediaFromType
        mediaProps={mediaProps}
        styles={styles}
      />

      { (title || subtitle) && (
        <CardMediaTitle
          subtitle={subtitle}
          title={title}
          styles={styles}
        />
      ) }
    </View>
  )
}

CardMedia.propTypes = {
  image: PropTypes.object,
  styles: PropTypes.object,
  subtitle: PropTypes.string,
  title: PropTypes.string,
}
