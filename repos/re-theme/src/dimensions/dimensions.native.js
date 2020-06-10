let RNDimensions

export const setRNDimensions = dims => {
  RNDimensions = dims
}

export const Dimensions = {
  get: (...params) => {
    return RNDimensions ? RNDimensions.get(...params) : { width: 0, height: 0 }
  },
  set: (...params) => {
    RNDimensions && RNDimensions.set(...params)
  },
  update: (...params) => {
    RNDimensions && RNDimensions.update(...params)
  },
  addEventListener: (...params) => {
    RNDimensions && RNDimensions.addEventListener(...params)
  },
  removeEventListener: (...params) => {
    RNDimensions && RNDimensions.removeEventListener(...params)
  },
}
