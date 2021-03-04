import { getWordEndingAt } from '../'

describe('getWordEndingAt', () => {

  const text = 'this is a sentence'

  it('Should return the word that ends at index (exclusive)', () => {
    const word = getWordEndingAt(text, 7)
    expect(word).toEqual('is')
  })

  it('should work with start of a string', () => {
    const first = getWordEndingAt(text, 4)
    expect(first).toEqual('this')
  })

  it('should work with end of a string', () => {
    const last = getWordEndingAt(text, text.length)
    expect(last).toEqual('sentence')
  })

  it('should return an empty string for spaces', () => {
    const word = getWordEndingAt(text, 5)
    expect(word).toEqual('')
  })
})