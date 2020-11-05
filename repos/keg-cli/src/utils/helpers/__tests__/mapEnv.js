
const { mapEnv } = require('../mapEnv')

describe('mapEnv', () => {

  it('should map the passed in staging env shortcut to the real value', () => {
    expect(mapEnv('l')).toBe('local')
    expect(mapEnv('loc')).toBe('local')
    expect(mapEnv('local')).toBe('local')
  })

  it('should map the passed in staging env shortcut to the real value', () => {
    expect(mapEnv('c')).toBe('ci')
    expect(mapEnv('ci')).toBe('ci')
  })

  it('should map the passed in staging env shortcut to the real value', () => {
    expect(mapEnv('t')).toBe('test')
    expect(mapEnv('tst')).toBe('test')
    expect(mapEnv('test')).toBe('test')
  })

  it('should map the passed in development env shortcut to the real value', () => {
    expect(mapEnv('d')).toBe('development')
    expect(mapEnv('dev')).toBe('development')
    expect(mapEnv('development')).toBe('development')
  })

  it('should map the passed in staging env shortcut to the real value', () => {
    expect(mapEnv('s')).toBe('staging')
    expect(mapEnv('st')).toBe('staging')
    expect(mapEnv('staging')).toBe('staging')
  })

  it('should map the passed in staging env shortcut to the real value', () => {
    expect(mapEnv('q')).toBe('qa')
    expect(mapEnv('qa')).toBe('qa')
  })

  it('should map the passed in staging env shortcut to the real value', () => {
    expect(mapEnv('p')).toBe('production')
    expect(mapEnv('prod')).toBe('production')
    expect(mapEnv('production')).toBe('production')
  })

  it('should use the meta default when no value is passed in', () => {
    expect(mapEnv(null, { default: 'my-test-env' })).toBe('my-test-env')
  })

})
