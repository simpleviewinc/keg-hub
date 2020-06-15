import { transition } from '../transition'

export const image = {
  default: {
    container: {
      $all: {
        display: 'flex',
      },
    },
    loadingComp: {},
    loading: {
      opacity: 0,
    },
    loaded: {
      opacity: 1,
    },
    image: {
      $web: {
        ...transition('opacity', 0.8),
      },
    },
    hover: {},
  },
}
