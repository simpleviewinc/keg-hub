const { isNum } = require('@keg-hub/jsutils')

const { getInternalIp } = require('../getInternalIp')

describe('getInternalIp', () => {

  afterAll(() => jest.resetAllMocks())

  it('should get the internal ip address of the machine', async () => {

    const internalIp = getInternalIp()
    const ipSplit = internalIp.split('.')

    expect(ipSplit.length).not.toBe(0)
    expect(ipSplit[0]).toBe('192')
    expect(ipSplit[1]).toBe('168')
    
    const secondLastNum = parseInt(ipSplit[2])
    expect(isNum(secondLastNum)).toBe(true)
    expect(secondLastNum <= 255).toBe(true)
    expect(secondLastNum >= 0).toBe(true)

    const lastNum = parseInt(ipSplit[3])

    expect(isNum(lastNum)).toBe(true)
    expect(lastNum <= 255).toBe(true)
    expect(lastNum > 0).toBe(true)

  })

})
