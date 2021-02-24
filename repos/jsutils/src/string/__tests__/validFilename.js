const Str = require('../')

describe('validFilename', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should return false on invalid filenames', () => {
    const filenames = [
      'foo/bar',
      '',
      null,
      undefined,
      'CON',
      '..',
      'Aux',
      'com1',
      'myfile:foobar.js',
      '<foo|bar>',
      '??hi.test',
      'test|2.0.js',
      '**myfile.png**',
      '\u0000'
    ]
    filenames.map(filename => 
      expect(Str.validFilename(filename)).toEqual(false)
    )
  })

  it('should return true on valid filenames', () => {
    const filenames = [
      'foo-bar',
      'valid.js',
      'nul1',
      'aux1 (2).png',
      'hello.',
      '.hiddenfile.tif'
    ]
    filenames.map(filename => 
      expect(Str.validFilename(filename)).toEqual(true)
    )
  })

})
