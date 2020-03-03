// Create a seperate object to hold the default local storage data, so we can reset back to it
const orgStorage = {
  test: 'foo',
  bar: 'baz',
}
let storage = { ...orgStorage }
const localStorage = { storage }

/**
 * Helper to reset the mock localStorage when running tests
 */
localStorage.reset = () => {
  localStorage.storage = { ...orgStorage }
  localStorage.getItem.mockClear()
  localStorage.setItem.mockClear()
  localStorage.removeItem.mockClear()
}

/**
 * Mock function to get items from the mock localStorage
 * @param {string} key - Name of the item to get
 * 
 * @returns {any} - The value of the key in storage
 */
localStorage.getItem = jest.fn(key => new Promise(res => {
  return res(storage[key])
}))
localStorage.getItemAsync = localStorage.getItem

/**
 * Mock function to save items from the mock localStorage
 * @param {string} key - Name of the item to set
 * @param {any} val - Value to save
 * 
 * @returns {boolean} - If the value was saved
 */
localStorage.setItem = jest.fn( (key, val) => {
  return new Promise(res => {
    storage[key] = val
    res(true)
  })
})
localStorage.setItemAsync = localStorage.setItem

/**
 * Mock function to remove items from the mock localStorage
 * @param {string} key - Name of the item to remove
 * 
 * @returns {boolean} - If the value was removed
 */
localStorage.removeItem = jest.fn(key => {
  return new Promise(res => {
    delete storage[key]
    res(true)
  })
})
localStorage.deleteItemAsync = localStorage.removeItem


if(typeof window !== 'undefined'){
  Object.defineProperty(window, 'localStorage', {
    value: localStorage,
    writable: true
  })
}

export {
  localStorage,
  localStorage as default,
}
