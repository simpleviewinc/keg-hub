export const transition = {
  animate: {
    default: { transition: 'transform 1s ease' },
    at: amount => ({ transition: 'transform ${amount}s ease' })
  },
  maxHeight: {
    overflow: 'hidden',
    transition: 'max-height 1s ease',
  },
}