const path = require('path')
const cliRoot = path.join(__dirname, '../../../../')
const { Branch } = require('../branch')

const branch = new Branch({})

describe('branch', () => {

  beforeEach(() => jest.resetAllMocks())

  describe('list', () => {

    it('should return a list of all branchs for the passed in location', async done => {
      const res = await branch.list(cliRoot)

      expect(typeof res).toBe(Array)
      done()

    })

  })

})