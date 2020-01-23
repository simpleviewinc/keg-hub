import { Mocks, Native } from 'SVMocks'

Mocks.setMocks({ native: Native })

const { reloadAppAction } = require('../reloadAppAction')

describe('Reload App action', () => {
  beforeEach(() => Mocks.resetMocks())

  it('should call the native reload method', () => {
    reloadAppAction()

    expect(Native.SVReload.reload).toHaveBeenCalled()
  })
})
