const path = require('path')
const cliRoot = path.join(__dirname, '../../../../')
const kegRoot = path.join(__dirname, '../../../../../')
const { Repo } = require('../repo')

const repo = new Repo({})

describe('repo', () => {

  afterAll(() => jest.resetAllMocks())

  describe('exists', () => {

    it('should return true if the location is a git repo', async done => {
      const res = await repo.exists(cliRoot)

      expect(res).toBe(true)
      done()

    })


    it('should return false if the location is not a git repo', async done => {
      const res = await repo.exists(kegRoot)

      expect(res).toBe(false)
      done()

    })

  })

})