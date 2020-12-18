const path = require('path')
const { isArr } = require('@keg-hub/jsutils')
const kegRoot = path.join(__dirname, '../../../../../')
const { git } = require('../git')


describe('branch', () => {

  afterEach(() => jest.resetAllMocks())

  describe('list', () => {

    it('should return a list of all branches for the passed in location', async done => {

      const res = await git.branch.list(kegRoot)

      expect(isArr(res)).toBe(true)

      done()
    })

    it('should return an array of  branch objects matching the correct model', async done => {

      const res = await git.branch.list(kegRoot)
      const keys = [ 'commit', 'name', 'current', 'message' ]

      res.map(branch => keys.map(key => expect(key in branch).toBe(true)))

      done()
    })

  })

})
