import { itemHeader } from './itemHeader'

export const header = config => {
  return {
    header: {
      ...itemHeader(config),
    },
  }
}
