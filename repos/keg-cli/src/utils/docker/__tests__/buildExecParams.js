const { buildExecParams } = require('../buildExecParams')

describe('buildExecParams', () => {

  afterAll(() => jest.resetAllMocks())

  it('Should return the correct exec params', () => {
    const args = { detach: true }
    const params = buildExecParams(args)

    expect(params).not.toBe(args)
    expect(params.privileged).toBe(true)
    expect(params.detach).toBe(true)
    expect(params.options).toBe('')
    expect(params.workdir).toBe(undefined)

  })

  it('Should return the correct workdir when location is passed in action params', () => {
    const args = { detach: false }
    const params = buildExecParams(args, { location: '/keg/location' })

    expect(params).not.toBe(args)
    expect(params.privileged).toBe(true)
    expect(params.detach).toBe(false)
    expect(params.options).toBe('-it')
    expect(params.workdir).toBe(`/keg/location`)

  })


  it('Should return the correct workdir when workdir is passed in action params', () => {
    const args = { detach: false }
    const params = buildExecParams(args, { workdir: '/keg/workdir' })

    expect(params).not.toBe(args)
    expect(params.privileged).toBe(true)
    expect(params.detach).toBe(false)
    expect(params.options).toBe('-it')
    expect(params.workdir).toBe(`/keg/workdir`)

  })

  it('Should override location with workdir when both are passed in the action params', () => {
    const args = { detach: false }
    const params = buildExecParams(args, { workdir: '/keg/workdir', location: '/keg/location' })

    expect(params).not.toBe(args)
    expect(params.privileged).toBe(true)
    expect(params.detach).toBe(false)
    expect(params.options).toBe('-it')
    expect(params.workdir).toBe(`/keg/workdir`)

  })

  it('Should return the override privileged value when passed in action params', () => {
    const args = { detach: false }
    const params = buildExecParams(args, { workdir: '/keg/app', privileged: false })

    expect(params).not.toBe(args)
    expect(params.privileged).toBe(false)
    expect(params.detach).toBe(false)
    expect(params.options).toBe('-it')
    expect(params.workdir).toBe(`/keg/app`)

  })

})