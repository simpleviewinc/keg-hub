const { docker } = require('KegMocks/libs/docker')
const container = global.testDocker.containers.core

jest.setMock('KegDocCli', docker)

const { getContext } = require('../getContext')

describe('getContext', () => {

    
  afterEach(() => jest.resetAllMocks())

  it('should get the context data from a passed in container name or id', async () => {

    const res = await getContext({ container: container.id })

    expect(res.context).toBe('core')
    expect(res.prefix).toBe('img-kegcore')
    expect(res.image).toBe('kegcore')

  })

  it('should get the context when context with keg is passed in', async () => {

    const res = await getContext({ context: 'kegcore' })

    expect(res.context).toBe('core')
    expect(res.prefix).toBe(undefined)
    expect(res.image).toBe(undefined)

  })

  it('should get the context when passed with prefix of img or package', async () => {

    const resImg = await getContext({ context: 'img-kegcore' })
    const resPack = await getContext({ context: 'package-kegcore' })

    expect(resImg.context).toBe('core')
    expect(resPack.context).toBe('core')

  })


  it('should return tap as the context when a tap is passed in', async () => {

    const res = await getContext({ tap: 'test-tap' })

    expect(res.context).toBe('tap')
    expect(res.tap).toBe('test-tap')

  })

})