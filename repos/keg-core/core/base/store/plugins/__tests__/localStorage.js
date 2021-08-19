import { Mocks } from 'KegMocks'
import { set } from '@keg-hub/jsutils'

const mockKeyStore = {
  setItem: jest.fn(),
  getItem: jest.fn(),
}

const persistFlag = set({}, 'plugins.localStorage.persist', 'test.path')

const mockStore = {}

Mocks.setMocks({
  store: mockStore,
  'native/keyStore': { KeyStore: mockKeyStore },
})

const { LocalStorage } = require('../localStorage')
const {
  Values: {
    Plugins: {
      LocalStorage: { LOADED_FROM_STORAGE },
    },
  },
} = require('KegConstants')

describe('Plugins: LocalStorage', () => {
  const orig = console.error
  const origWarn = console.warn
  beforeEach(() => {
    mockKeyStore.setItem = jest.fn()
    console.error = jest.fn(console.log)
    console.warn = jest.fn()
  })

  const expectNoErrors = () => {
    expect(console.error).toBeCalledTimes(0)
  }

  afterEach(() => expectNoErrors())

  afterAll(() => {
    console.error = orig
    console.warn = origWarn
  })

  it('should store a category-key path', async () => {
    const path = 'test.path'
    const item = 55
    const action = {
      type: 'UPSERT_ITEM',
      payload: {
        category: 'test',
        key: 'path',
        item,
        ...persistFlag,
      },
    }

    LocalStorage({ action })
    expect(mockKeyStore.setItem).toHaveBeenCalledWith(path, item.toString())
  })

  it('should store/load a category-key-property path', async () => {
    const path = 'test.path'
    const item = { foo: 55 }
    const action = {
      type: 'UPSERT_ITEM',
      payload: {
        category: 'test',
        key: 'path',
        item,
        ...persistFlag,
      },
    }

    // run plugin
    LocalStorage({ action })

    expect(mockKeyStore.setItem).toHaveBeenCalledWith(
      path,
      JSON.stringify(item)
    )
  })

  it('should ignore an upsert action originating from the local storage load operation, on update', () => {
    const action = {
      type: 'UPSERT_ITEMS',
      payload: {
        ...persistFlag,
      },
      [LOADED_FROM_STORAGE]: true,
    }

    LocalStorage({ action })

    expect(mockKeyStore.setItem).toHaveBeenCalledTimes(0)
  })

  it('should ignore an action without a persist flag', () => {
    const action = {
      type: 'UPSERT_ITEMS',
      payload: {
        category: 'test',
        key: 'foo',
        items: [ 1, 2, 3 ],
      },
    }

    LocalStorage({ action })

    expect(mockKeyStore.setItem).toHaveBeenCalledTimes(0)
  })

  it('should store/load a category path (upsertItems)', async () => {
    const path = 'test'
    const items = { path: { foo: 55 } }
    const action = {
      type: 'UPSERT_ITEMS',
      payload: {
        category: 'test',
        plugins: set({}, 'localStorage.persist', 'test'),
        items,
      },
    }

    LocalStorage({ action })
    expect(mockKeyStore.setItem).toHaveBeenCalledWith(
      path,
      JSON.stringify(items)
    )
  })

  it('should work with an array of persist paths, ignoring any properties not in the persist array', () => {
    const item = {
      foo: 3,
      bar: 2,
      baz: 1,
    }
    const action = {
      type: 'UPSERT_ITEM',
      payload: {
        category: 'test',
        key: 'path',
        item,
        plugins: set({}, 'localStorage.persist', [
          'test.path.foo',
          'test.path.baz',
        ]),
      },
    }

    LocalStorage({ action })

    expect(mockKeyStore.setItem.mock.calls).toEqual([
      [ 'test.path.foo', item.foo.toString() ],
      [ 'test.path.baz', item.baz.toString() ],
    ])
  })
})
