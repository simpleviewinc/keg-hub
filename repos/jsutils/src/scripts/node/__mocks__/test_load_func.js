// Test helper to test loading a function
module.exports = jest.fn((data1, data2, data3) => {
  return Object.assign({
    key: "I am a test object"
  }, data1)
})