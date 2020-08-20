let RNDimensions

const checkDimensions = callBack => {
  return (...props) => {
    return RNDimensions
      ? callBack(...props)
      : console.error(
        `[ ReTheme ERROR ] - Missing Dimensions`,
        `\n   - You must initialize 'Dimensions' before using the 'ReThemeProvider'`,
        `\n   - Do this by calling 'setRNDimensions(Dimensions)'`,
        `\n   - The first argument must be the 'Dimensions' export of 'react-native'`,
        `\n   - Or an Object with a matching API`
      )
  }
}

export const setRNDimensions = dims => (RNDimensions = dims)

export const Dimensions = {
  get: checkDimensions((...params) => {
    return RNDimensions ? RNDimensions.get(...params) : { width: 0, height: 0 }
  }),
  set: checkDimensions((...params) => {
    RNDimensions && RNDimensions.set(...params)
  }),
  update: checkDimensions((...params) => {
    RNDimensions && RNDimensions.update(...params)
  }),
  addEventListener: checkDimensions((...params) => {
    RNDimensions && RNDimensions.addEventListener(...params)
  }),
  removeEventListener: checkDimensions((...params) => {
    RNDimensions && RNDimensions.removeEventListener(...params)
  }),
}
