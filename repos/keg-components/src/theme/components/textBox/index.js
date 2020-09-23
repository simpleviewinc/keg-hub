import { containedInit } from './textBox.contained'
import { outlinedInit } from './textBox.outlined'

export const textBox = (config) => {
  const contained = containedInit(config)
  return {
    contained,
    outlined: outlinedInit(config, contained),
  }
}
