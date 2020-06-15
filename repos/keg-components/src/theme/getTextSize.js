import { PixelRatio, Dimensions } from 'react-native'

const pixelRatio = PixelRatio.get()
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const smPixelRatio = size => {
  return deviceWidth < 360
    ? size * 0.95
    : deviceHeight < 667
      ? size
      : deviceHeight >= 667 && deviceHeight <= 735
        ? size * 1.15
        : size * 1.25
}

const medPixelRatio = size => {
  return deviceWidth <= 360
    ? size
    : deviceHeight < 667
      ? size * 1.15
      : deviceHeight >= 667 && deviceHeight <= 735
        ? size * 1.2
        : size * 1.27
}

const lrgPixelRatio = size => {
  return deviceWidth <= 360
    ? size
    : deviceHeight < 667
      ? size * 1.2
      : deviceHeight >= 667 && deviceHeight <= 735
        ? size * 1.25
        : size * 1.4
}

export const getTextSize = size => {
  return pixelRatio >= 2 && pixelRatio < 3
    ? smPixelRatio(size)
    : pixelRatio >= 3 && pixelRatio < 3.5
      ? medPixelRatio(size)
      : pixelRatio >= 3.5
        ? lrgPixelRatio(size)
        : size
}
