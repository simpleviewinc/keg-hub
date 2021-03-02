import { getWordStartingAt } from '../'

describe('getWordStartingAt', () => {

  const text = 'this is a sentence'

  it('should get the word that begins at the index', () => {
    expect(getWordStartingAt(text, 0)).toEqual('this')
    expect(getWordStartingAt(text, 5)).toEqual('is')
  })

  it('should work with the last word', () => {
    expect(getWordStartingAt(text, 10)).toEqual('sentence')
  })

  it('should work with spaces', () => {
    expect(getWordStartingAt(text, 4)).toEqual('')
  })

  it('should work with custom delimiters', () => {
    const test = 'This is a sentence. Here is another.'
    const word = getWordStartingAt(test, 10, ['.'])
    expect(word).toEqual('sentence')
  })
})