export const getOnLoad = (isWeb, callback) => ({
  [isWeb ? 'onLoad' : 'onLoadEnd']: callback,
})
