import { createMemoryHistory } from 'history'
const { navigateToPath } = require('../navigateToPath')

describe('navigateToPath', () => {

  it('is a valid navigation', () => {

    const history = createMemoryHistory()
    jest.spyOn(history, 'push')

    const path = "/some/path"
    navigateToPath(path, history)
    expect(history.push).toHaveBeenCalled()
  })

  it('should return unsuccessful when missing params', () => {

    const history = createMemoryHistory()
    jest.spyOn(history, 'push')
    
    const {success, message} = navigateToPath(null, history)

    expect(history.push).not.toHaveBeenCalled()
    expect(success).toBeFalsy()
    expect(message).toBeTruthy()
  })


})