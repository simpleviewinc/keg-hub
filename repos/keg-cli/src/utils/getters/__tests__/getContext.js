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
    expect(resImg.tap).toBe('img-keg-core')
    expect(resImg.prefix).toBe('img')
    expect(resImg.withPrefix).toBe('img-keg-core')
    expect(resImg.noPrefix).toBe('keg-core')


    expect(resPack.context).toBe('core')
    expect(resPack.tap).toBe('package-keg-core')
    expect(resPack.prefix).toBe('package')
    expect(resPack.withPrefix).toBe('package-keg-core')
    expect(resPack.noPrefix).toBe('keg-core')

  })


  it('should return tap as the context when a tap is passed in', async () => {

    const res = await getContext({ tap: 'test-tap' })

    expect(res.context).toBe('tap')
    expect(res.tap).toBe('test-tap')

  })

  it('should return tap context when a prefixed tap container is passed', async () => {

    const resImg = await getContext({ context: 'img-test-tap' })
    const resPack = await getContext({ container: 'package-test-tap' })

    expect(resImg.context).toBe('tap')
    expect(resImg.tap).toBe('test-tap')
    expect(resImg.prefix).toBe('img')
    expect(resImg.noPrefix).toBe('test-tap')
    expect(resImg.withPrefix).toBe('img-test-tap')

    expect(resPack.context).toBe('tap')
    expect(resPack.tap).toBe('test-tap')
    expect(resPack.prefix).toBe('package')
    expect(resPack.noPrefix).toBe('test-tap')
    expect(resPack.withPrefix).toBe('package-test-tap')

  })

})
