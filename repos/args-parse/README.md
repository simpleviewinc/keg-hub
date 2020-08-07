# argsParse
Parse command line arguments

## Setup

### Install It
Add to your package.json

  ```js
    "argsParse": "git+https://github.com/lancetipton/argsParse.git"
  ```

### Use It
See test [examples](https://github.com/lancetipton/argsParse/blob/master/__tests__/argsParse.js)

```js
;(() => {

  const { argsParse } = require('argsParse')
  const task = {
    options: {
      // Define required
      doo: {
        description: "dew the doo",
        require: true,
      },
      // Define defaults
      foo: {
        description: 'I am foo bar',
        default: 'bar'
      },
      baz: {
      // Define alias
        alias: [ 'zoo' ],
        description: 'The baz with bas',
      },
    }
  }
  
  const parsed = await argsParse({
    task,
    args: [ 'doo=f', '--zoo', 'bas', ],
  })
  
  expect(parsed.doo).toBe(false)
  expect(parsed.foo).toBe('bar')
  expect(parsed.baz).toBe('bas')

})()

```

## Custom Config
* Use the `PARSE_CONFIG_PATH` environment vairable to overwrite the path to the parse config
  * Path should be relative to the applications root directory
* See default [config](https://github.com/lancetipton/argsParse/blob/master/configs/parse.config.js)
* Custom Configs should match the keys within the default config
  * `bools` && `environment`
