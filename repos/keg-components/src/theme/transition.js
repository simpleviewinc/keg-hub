export const transition = {
  animate: {
    main: { transition: 'transform 1s ease' },
    at: amount => ({ transition: 'transform ${amount}s ease' })
  },
  maxHeight: {
    overflow: 'hidden',
    transition: 'max-height 1s ease',
  },
}