export const transition = (prop='all', amount=1, type='ease') => (
  { transition: `${prop} ${amount}s ${type}` }
)

transition.move = (amount=1, type='ease') => ({ transition: `transform ${amount}s ${type}` })
transition.opacity = (amount=1, type='ease') => ({ transition: `opacity ${amount}s ${type}` })

transition.maxHeight = {
  overflow: 'hidden',
  transition: 'max-height 1s ease',
}