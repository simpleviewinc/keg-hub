const { generalError } = require('KegMocks/utils/error/generalError')
const { repos: mockRepos } = require('KegMocks/data')
const globalConfig = global.getGlobalCliConfig()
const publishContext = globalConfig.publish.test

jest.setMock('KegUtils/error', { generalError })

const { getPublishContextOrder } = require('../getPublishContextOrder')

describe('getPublishContextOrder', () => {

  afterAll(() => jest.resetAllMocks())

  it('should order the repos based on the publishContext order', () => {

    const repos = getPublishContextOrder(mockRepos, publishContext)

    expect(repos.length).toBeGreaterThan(0)
    repos.map((repo, index) => {
      expect(repo.package.name).toEqual(publishContext.order[index])
    })
  })

  it('should call generalError && throw an error if publishContext does not have order', () => {
    expect(() => getPublishContextOrder(mockRepos, {name: 'test'})).toThrow()
  })
})