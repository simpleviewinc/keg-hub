const { platformFlatten } = require('../platformFlatten')

const oneLevel = {
  level1: {
    $all: {
      foo: 'bar',
    },
    $web: {
      bas: 'baz',
    },
    $native: {
      bas: 'baz',
    },
  },
}

const twoLevel = {
  level1: {
    $all: {
      foo1: 'bar1',
    },
    $web: {
      bas1: 'baz1',
    },
    $native: {
      bas1: 'baz1',
    },
    level2: {
      $all: {
        foo2: 'bar2',
      },
      $web: {
        bas2: 'baz2',
      },
      $native: {
        bas2: 'baz2',
      },
    },
  },
}

describe('platformFlatten', () => {
  it('should flatten the passed in object', () => {
    const flattened = platformFlatten(oneLevel)

    expect(flattened.level1['$all']).toBe(undefined)
    expect(flattened.level1['$web']).toBe(undefined)
    expect(flattened.level1['$native']).toBe(undefined)

    expect(flattened.level1.foo).toBe(oneLevel.level1['$all'].foo)
    expect(flattened.level1.bas).toBe(oneLevel.level1['$web'].bas)
  })

  it('should flatten all levels of the passed in object', () => {
    const flattened = platformFlatten(twoLevel)

    expect(flattened.level1.foo1).toBe('bar1')
    expect(flattened.level1.bas1).toBe('baz1')
    expect(flattened.level1.level2.foo2).toBe('bar2')
    expect(flattened.level1.level2.bas2).toBe('baz2')
  })
})
