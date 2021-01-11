
const pushOptions = (task, action) => {
  return {
    build: {
      description: 'Build the docker image before pushing to the provider',
      example: `keg ${task} ${action} --build`,
      default: false
    },
    namespace: {
      description: 'Use the docker namespace instead of the user for the docker provider url',
      example: `keg ${task} ${action} --no-namespace`,
      default: true
    },
    tag: {
      description: 'Specify the tag tied to the image being pushed',
      example: `keg ${task} ${action} --tag my-tag`,
    },
    tags: {
      description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
      example: `keg ${task} ${action} tags=my-tag,local,develop`
    },
    tap: {
      description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
      example: `keg ${task} ${action} --tap <name-of-linked-tap>`,
    },
    token: {
      description: 'API Token for the registry provider',
      example: `keg ${task} ${action} token=<custom-provider-token>`
    },
    user: {
      description: 'User to use when logging into the registry provider',
      example: `keg ${task} ${action} user=<custom-provider-user>`
    },
    log: {
      description: 'Log the output the of commands',
      example: `keg ${task} ${action} --log`,
      default: false,
    },
  }
}

module.exports = {
  pushOptions
}