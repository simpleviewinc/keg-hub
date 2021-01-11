import { containedInit } from './contained'

export const card = config => {
  const contained = containedInit(config)
  return {
    card: {
      contained,
      default: contained,
    },
  }
}
