export const transition = {
  height: {
    overflow: 'hidden',
    transition: 'max-height 1s ease',
  },
  rotate: {
    default: { transition: 'transform 1s ease' },
    180: { transform: 'rotate(180deg)' }
  },
}