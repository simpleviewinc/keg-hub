const path = require('path')
const kegRoot = path.join(__dirname, '../../../../../')
const { Repo } = require('../repo')

const repo = new Repo({})

describe('repo', () => {

  afterAll(() => jest.resetAllMocks())

  describe('exists', () => {

    it('should return true if the location is a git repo', async () => {
      const res = await repo.exists(kegRoot)
      expect(res).toBe(true)
    })

    it('should return false if the location is not a git repo', async () => {
      const res = await repo.exists(path.join(kegRoot, '../../'))
      expect(res).toBe(false)
    })

  })

})