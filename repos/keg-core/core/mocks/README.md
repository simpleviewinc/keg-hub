# Tests

* Uses [Jest](https://jestjs.io/)

## To Run

* Run command => `yarn test`
  * Runs all test
* Add a folder path to run specific tests => `yarn test /core/base/containers/__tests__`
  * Runs only tests in the `containers/__tests__` folder

## Setup

* Create a `__tests__` folder in the same folder as the file to test if one does not exist
* Inside the `__tests__` create a file with the same name as the file to be tests

### Example Structure 

  * If testing file at `<root_dir>/core/base/containers/app.js`
  * Create a `__tests__` folder at `<root_dir>/core/base/containers/__tests__`
    * Create an `app.js` file inside this folder
      * Add all tests for `<root_dir>/core/base/containers/app.js` to this file

## Mocks
  * Helpers to mock node_modules or other files
  * Add to the test file => `import { ...Mocks to import } from 'KegMocks'`