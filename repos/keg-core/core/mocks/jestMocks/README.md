# Jest Mocks helpers

* Helpers to mock files when testing
* Wrapper for `jest.setMock` && `jest.resetModules()`


### Usage

* Import into your test file => `import { Mocks } from 'SVMocks'`
  * To mock a path => `Mocks.setMocks({ 'path/to/mock': { ...mock object } })`

### API

* `Mocks.setMocks`
  * Normalizes paths when mocking files
  * Defaults the mock path to br `<root_dir>/core/base`
  * Takes 2 parameters
    * Parameter 1 ( Object )
      * Key/value pair of paths to mock and their mock object
        * Example => `{ 'reducers/app': { ...app reducer object } }`
      * If the key matches a key in `dependencies` or `devDependencies` of `package.json`
          * It will auto mock the `node_module` instead
          * Example => 
          ```js
            Mocks.setMocks({
              // Will mock the file <root_dir>/core/base/store/index.js with the Store object
              'store': Store, 
              // Will mock the react-redux node_module with the Redux Object
              'react-redux': Redux 
            })
          ```
    * Parameter 2 ( boolean )
      * Defaults to `false`
      * If true will call `Mocks.resetMocks`
    
* `Mocks.resetMocks`
  * Takes no parameters
  * Just a convenience wrapper for `jest.resetModules()`
