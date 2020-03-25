const Obj = require('../')

describe('isEntry', () => {

  beforeEach(() => jest.resetAllMocks())

  it("should return true if the input is an entry, false otherwise", () => {

    const cases = [
      [ [1, 2], true ],
      [ [1, 2, 3], false ],
      [ [1], false ],
      [ {}, false ],
      [ null, false ],
      [ [], false ],
    ]
    cases.map(([entry, expectedResult]) => {
      const result = Obj.isEntry(entry)
      expect(result).toBe(expectedResult)
    })

  })

  it("should check that the first element is number or string", () => {
    const cases = [
      [ ["id", 1], true ],
      [ [0, "value"], true ],
      [ [new Date(), "value"], false ],
      [ [true, "value"], false ],
    ]
    cases.map(([entry, expectedResult]) => {
      const result = Obj.isEntry(entry)
      expect(result).toBe(expectedResult)
    })
  })

})
