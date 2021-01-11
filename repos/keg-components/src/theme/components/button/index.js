import { containedInit } from './contained'
import { textInit } from './text'
import { outlineInit } from './outline'

export const button = config => {
  const contained = containedInit(config)

  return {
    button: {
      contained,
      text: textInit(config, contained),
      outline: outlineInit(config, contained),
    },
  }
}
