export const transition = {
  animate: {
    default: { transition: `transform 1s ease` },
    at: (amount=1, type='ease') => ({ transition: `transform ${amount}s ${type}` })
  },
  maxHeight: {
    overflow: 'hidden',
    transition: 'max-height 1s ease',
  },
}