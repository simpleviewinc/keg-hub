import { uuid } from '../../method/uuid'

const Str = require('../')

describe('isUuid', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should check if some data is a uuid string', () => {
    const amValid1 = `d3aa88e2-c754-41e0-8ba6-4198a34aa0a2`
    const amValid2 = uuid()
    const notValid1 = `abcdef00-0000-0000-0000-000000000000`
    const notValid2 = `d3aa88e2-c754-41ex-8ba6-4198a34aa0a2`
    const notValid3 = '123-123-12345-432-1'

    expect(Str.isUuid(amValid1)).toEqual(true)
    expect(Str.isUuid(amValid2)).toEqual(true)
    expect(Str.isUuid(notValid1)).toEqual(false)
    expect(Str.isUuid(notValid2)).toEqual(false)
    expect(Str.isUuid(notValid3)).toEqual(false)

  })

})
