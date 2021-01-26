import { sectionInit } from './sectionList'

export const list = config => {
  const section = sectionInit(config)

  return {
    list: {
      section,
    },
  }
}
