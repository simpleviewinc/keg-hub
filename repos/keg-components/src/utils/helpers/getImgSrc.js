import { isObj, isStr } from 'jsutils'

export const getImgSrc = (isWeb, src, source, uri) => {
  const imgSrc = src || source || uri
  const key = isWeb ? 'src' : 'source'

  return {
    [key]: isWeb
      ? isObj(imgSrc)
          ? imgSrc.uri
          : imgSrc
      : isStr(imgSrc)
        ? { uri: imgSrc }
        : imgSrc,
  }
}
