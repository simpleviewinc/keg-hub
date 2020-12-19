# Keg Core

## Overview

The keg is a platform for developing cross-platform react apps.
It comes preconfigured to target both web and mobile, and it contains a 
collection of utilities for simplifying development, including:
  * built-in routing and navigation
  * a reducer based on the relational data model
  * dynamic theming via [re-theme](https://github.com/simpleviewinc/re-theme)
  * cross platform persistent storage

## Tap usage

* To start, first setup the [keg-cli](https://github.com/simpleviewinc/keg-cli#install)
* Next, use the cli to generate a tap:
`keg gn tap`
* `cd` into your tap's directory, then run `yarn setup`
* The tap you generated will have installed `keg-core` as a dependency
* Read more about tap-development [here](https://www.some-docs-we-need-to-write.confluence.com)

### Defining Environment Variables
* Within your tap's config file (e.g. `tap.js`, `tap.json`), you can define an `envs` property in the `keg` object like this:
```js
module.exports = {
  ...,
  keg: {
    ...
    envs: {
      'process.env.FOO': 'bar',
      SOME_API_KEY: getAPIKey()
      'process.env.TAP_LICENSE': 'tap.package.license'
    }
  }
}
```
And these will be replaced in your code, so that you can use them like this:
```js
const myFunction () {
  makeAPICall(SOME_API_KEY)
  console.log('Foo', process.env.FOO)
  console.log('This tap uses the license', process.env.TAP_LICENSE)
}
```
  * you can define dynamic envs that pull data from a `package.json` or an app config by using the form:
    `<tap|core>.<package|config>.<some_property>`
    * so the `tap.package.license` will evaluate to the value of the `license` property in your tap's `package.json`
  * every env is automatically stringified
#### Running with webpack / expo
  * These envs are automatically replaced for you at build time
#### Running with other build tools
  * If you use a different bundler, like rollup, you can still use these envs by importing
  the `getKegEnvs` function from `keg-core/core/scripts/js/getKegEnvs`
    * learn more [here](./core/scripts/js/getKegEnvs.js)
  * then, just use them into your tool's replacement plugin 

## Architecture

### Store

* [Reducers](core/base/reducers/README.md)
* [Plugins](core/base/store/plugins/README.md)


