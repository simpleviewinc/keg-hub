const { docker } = require('KegMocks/libs/docker')
const container = global.testDocker.containers.core

jest.setMock('KegDocCli', docker)

const { getContext } = require('../getContext')

describe('getContext', () => {

  afterAll(() => jest.resetAllMocks())

  it('should get the context data from a passed in container name or id', async () => {

    const res = await getContext({ container: container.id }, true)

    expect(res.context).toBe('core')
    expect(res.withPrefix).toBe('img-keg-core')
    expect(res.image).toBe('keg-core')

  })

  it('should get the context when context with keg is passed in', async () => {

    const res = await getContext({ context: 'keg-core' })

    expect(res.context).toBe('core')
    expect(res.withPrefix).toBe(undefined)
    expect(res.image).toBe(undefined)

  })

  it('should get the context when passed with prefix of img or package', async () => {

    const resImg = await getContext({ context: 'img-keg-core' })
    const resPack = await getContext({ context: 'package-keg-core' })

    expect(resImg.context).toBe('core')
    expect(resPack.context).toBe('core')

  })


  it('should return tap as the context when a tap is passed in', async () => {

    const res = await getContext({ tap: 'test-tap' })

    expect(res.context).toBe('tap')
    expect(res.tap).toBe('test-tap')

  })

})
