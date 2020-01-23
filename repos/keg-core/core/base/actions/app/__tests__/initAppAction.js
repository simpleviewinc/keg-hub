import { Mocks, Redux } from 'SVMocks'
import { ActionTypes } from 'SVConstants'

Mocks.setMocks({ store: Redux.STORE })

const { initAppAction } = require('../initAppAction')

describe('Init App action', () => {
  beforeEach(() => Mocks.resetMocks())

  it('should set initialized to true in the redux store', () => {
    initAppAction()
    const dispatchArgs = Redux.STORE.dispatch.mock.calls[0][0]

    expect(Redux.STORE.dispatch).toHaveBeenCalled()
    expect(dispatchArgs.type).toBe(ActionTypes.APP_INIT)
    expect(dispatchArgs.initialized).toBe(true)
  })
})
