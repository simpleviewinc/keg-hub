import { containedInit } from './contained'

export const card = (config) => {
  return {
    default: containedInit(config),
  }
}
