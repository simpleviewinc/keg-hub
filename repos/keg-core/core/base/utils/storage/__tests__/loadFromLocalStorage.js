import { Mocks } from 'SVMocks'
import { ActionTypes } from 'SVConstants'

const mockStore = {
  dispatch: null,
}

Mocks.setMocks({
  'utils/platform': { isStandalonePWA: () => false },
  store: mockStore,
})

const { loadFromLocalStorage } = require('../')
const {
  Values: {
    Plugins: {
      LocalStorage: { LOADED_FROM_STORAGE },
    },
  },
} = require('SVConstants')

describe('loadFromLocalStorage', () => {
  const path = 'users'
  const names = [ 'picasso', 'michaelangelo' ]
  const orig = console.error
  let mockLocalStorage
  let mockKeyStore
  beforeEach(() => {
    mockLocalStorage = {}
    mockKeyStore = {
      getItem: path => Promise.resolve(mockLocalStorage[path]),
      setItem: (path, value) =>
        (mockLocalStorage[path] = JSON.stringify(value)),
    }
    mockKeyStore.setItem(path, names)
    mockStore.dispatch = jest.fn()

    console.error = jest.fn()
  })

  afterAll(() => {
    console.error = orig
    Mocks.resetMocks()
  })

  it('should load a category of items from the path', async () => {
    await loadFromLocalStorage({
      path,
      storage: mockKeyStore,
    })
    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: ActionTypes.UPSERT_ITEMS,
      payload: {
        category: path,
        items: names,
      },
      [LOADED_FROM_STORAGE]: true,
    })
    expect(console.error).toBeCalledTimes(0)
  })

  it('should load an individual item from path', async () => {
    const category = 'users'
    const key = 'picasso'
    const path = `${category}.${key}.name`
    const name = 'Mr. Picasso'
    mockKeyStore.setItem(`${category}.${key}.name`, name)

    await loadFromLocalStorage({ path, storage: mockKeyStore })

    expect(mockStore.dispatch).toHaveBeenCalledWith({
      type: ActionTypes.UPSERT_ITEM,
      payload: {
        category,
        key,
        item: { name },
        items: false,
      },
      [LOADED_FROM_STORAGE]: true,
    })
    expect(console.error).toBeCalledTimes(0)
  })

  it('should log errors for bad input', async () => {
    expect.assertions(2)

    await expect(
      loadFromLocalStorage({ path: 1, storage: mockKeyStore })
    ).rejects.toEqual('Invalid input')

    await expect(loadFromLocalStorage({ path, storage: {} })).rejects.toEqual(
      'Invalid input'
    )
  })
})
