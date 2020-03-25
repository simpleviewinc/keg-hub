const Url = require('..')

describe('isValidUrl', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return TRUE for valid urls', () => {

    const urls = [
      "https://google.com?name=daniel&id=1",
      "http://google.com????",
      "https://www.google.uk",
      "https://zsales.zerista.com"
    ]

    urls.map((url) => {
      expect(Url.isValidUrl(url)).toBe(true)
    })
  })

  it('should return FALSE for invalid urls', () => {

    const urls = [
      "hasdfas://google.com?name=daniel&id=1",
      "//google.com????",
      "htp://www.google.uk",
      "zsales.zerista.com"
    ]

    urls.map((url) => {
      expect(Url.isValidUrl(url)).toBe(false)
    })
  })

      
})