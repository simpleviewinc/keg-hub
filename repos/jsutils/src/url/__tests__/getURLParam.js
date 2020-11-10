import { getURLParam } from '../getURLParam'
import { objToQuery } from '../objToQuery'

describe('getURLParam (with document)', () => {
  afterEach(() => {
    delete global['document']
  })

  const setParam = (param, value) => {
    global.document = {
      location: {
        search: objToQuery({
          [param]: value
        })
      }
    }
  }

  it('should return null on platforms without a document', () => {
    delete global['document']
    const result = getURLParam('test')
    expect(result).toBeNull()
  })

  it ('should return null if no url parameter by that key exists', () => {
    setParam('key', 'value')
    expect(getURLParam('other key')).toBeNull()
  })

  it ('should return the value if for the url parameter if that key exists', () => {
    const key = 'key'
    const value = 'value'
    setParam(key, value)
    expect(getURLParam(key)).toEqual(value)
  })

  it ('should return null for invalid input', () => {
    const orig = console.error
    console.error = jest.fn()
    expect(getURLParam({})).toEqual(null)
    expect(console.error).toHaveBeenCalledTimes(1)
    console.error = orig
  })

})