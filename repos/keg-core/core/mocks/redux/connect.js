import { STATE } from './store'

export const connect = jest.fn(mapStateToProps => component => props =>
  (compProps => new component(compProps))({
    ...props,
    ...mapStateToProps(STATE),
  })
)
