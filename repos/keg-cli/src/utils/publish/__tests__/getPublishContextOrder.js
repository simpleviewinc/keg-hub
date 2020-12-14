const { generalError } = require('KegMocks/utils/error/generalError')

jest.setMock('KegUtils/error', { generalError })

const publishContext =  {
  "name": "test",
  "dependent": true,
  "order": {
    0: '@keg-hub/re-theme',
    1: '@keg-hub/keg-components',
    2: '@keg-hub/keg-core'
  }
}

const mockRepos = [
  {
    repo: 'jsutils',
    package: {
      name: '@keg-hub/jsutils',
      version: '8.0.0',
    }
  },
  {
    repo: 'keg-components',
    package: {
      name: '@keg-hub/keg-components',
      version: '8.0.0',
    }
  },
  {
    repo: 'keg-core',
    package: {
      name: '@keg-hub/keg-core',
      main: 'node_modules/expo/AppEntry.js',
      version: '8.0.0',
    }
  },
  {
    repo: 're-theme',
    package: {
      name: '@keg-hub/re-theme',
      version: '8.0.0',
    }
  }
]

const { getPublishContextOrder } = require('../getPublishContextOrder')

describe('getPublishContextOrder', () => {

  afterAll(() => jest.resetAllMocks())

  it('should order the repos based on the publishContext order', () => {
    const repos = getPublishContextOrder(mockRepos, publishContext)
    repos.map((repo, index) => {
      expect(repo.package.name).toEqual(publishContext.order[index])
    })
  })

  it('should call generalError && throw an error if publishContext does not have order', () => {
    expect(() => getPublishContextOrder(mockRepos, {name: 'test'})).toThrow()
  })
})