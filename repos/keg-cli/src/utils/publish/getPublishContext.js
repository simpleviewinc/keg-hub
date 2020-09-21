const { get, deepMerge } = require('@keg-hub/jsutils')

const getPublishContext = (globalConfig, context, publishArgs) => {
  // Get the publish context from the globalConfig, and merge with passed in publish args
  return deepMerge(
    {
      tasks: {
        install: true,
        test: true,
        build: true,
        version: true,
        publish: true,
      }
    },
    get(globalConfig, `publish.${context}`),
    publishArgs
  )
}

module.exports = {
  getPublishContext
}