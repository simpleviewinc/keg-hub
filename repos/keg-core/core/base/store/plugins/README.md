# Overview

Store plugins are middleware that process dispatched actions **before** the reducers do.

## Specification

Each plugin is just a function that accepts an object containing an action as input, and it returns a similar object. The returned action can be modified or not, but the plugin must return one. Any plugins further down the pipeline will process this action, until
ultimately the reducers process it.

```javascript
// core/base/store/plugins/myPlugin.js
export const StorePlugin = ({ action }) => {
  return { action: doSomethingWithAction(action) }
}
```
* Plugins are imported and run where the [store is created](../index.js)
* If a plugin throws an error, it will prevent any other plugins from running

## Creating a new plugin
1. Add a file exporting your plugin that conforms to the spec above to `core/base/store/plugins` 

2. Export your plugin from [plugins.js](./plugins.js)