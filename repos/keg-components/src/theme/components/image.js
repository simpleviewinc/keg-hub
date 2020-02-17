import { transition } from '../transition'

export const image = {
  default: {
    $web: {
      ...transition('opacity', 0.8),
    }
  },
  wrapper: {
    display: 'inline-flex',
  },
  loading: {
    opacity: 0
  },
  loaded: {
    opacity: 1
  }
}
