const { deepMerge } = require('@ltipton/jsutils')

/**
 * Builds the options for the compose service
 * @param {Object} task - Name of the task calling the compose service
 * @param {Object} action - Name of the action calling the compose service
 *
 * @returns {Object} - Options for tasks using the compose service
 */
const serviceOptions = (task='', action='', overrides={}) => {
  return deepMerge({
    // Add the overrides here, so key order matches 
    // This allows setting the context as the first key within the object
    // The overrides + the options defined here get merged with the overrides again
    // This is to ensure the override values are used, while keeping the correct order
    ...overrides,
    build: {
      description: 'Removes and rebuilds the docker container before running keg-components',
      example: 'keg ${ task } ${ action } --build',
      default: false,
    },
    cache: {
      description: 'Docker will use build cache when building the image',
      default: true,
      example: `keg ${ task } ${ action } --cache false`,
    },
    command: {
      alias: [ 'cmd' ],
      description: 'Overwrites the default yarn command. Command must exist in package.json scripts!',
      example: 'keg ${ task } ${ action } --command ios ( Runs "yarn dev" )',
    },
    destroy: {
      alias: [ 'des' ],
      description: 'All collateral items will be destoryed if the sync task fails ( true )',
      example: 'keg ${ task } ${ action } --destroy false',
      default: true
    },
    docker: {
      alias: [ 'doc' ],
      description: `Extra docker arguments to pass to the 'docker run command'`,
      example: 'keg ${ task } ${ action } --docker "-e MY_EXTRA_ENV=foo"'
    },
    satisfy: {
      alias: [ 'sat', 'ensure' ],
      description: 'Will check if required images are built, and build them in necessary.',
      example: "keg ${ task } ${ action } --satisfy false",
      default: true,
    },
    follow: {
      alias: [ 'f', 'tail', 't' ],
      description: 'Automatically follow the log output of the started service',
      example: `keg ${ task } ${ action } --follow false`,
      default: true
    },
    install: {
      description: 'Install node_modules ( yarn install ) in the container before starting the app',
      example: 'keg ${ task } ${ action } --install',
      default: false
    },
    log: {
      alias: [ 'lg' ],
      description: 'Prints log information as the task runs',
      example: 'keg ${ task } ${ action } --log',
      default: false,
    },
    local: {
      description: 'Copy the local repo into the docker container at build time',
      example: `keg ${ task } ${ action } --local`,
      default: false,
    },
    mounts: {
      description: `List of key names or folder paths to mount into the docker container. Only used when service === 'container'`,
      example: 'keg ${ task } ${ action } --mounts cli,retheme',
    },
    sync: {
      alias: [ 'syncs', 'sy' ],
      type: 'array',
      description: 'List of key names or folder paths to sync through mutagen into the docker container.',
      example: 'keg ${ task } ${ action } --sync cli,retheme',
    },
    service: {
      allowed: [ 'compose', 'container', 'mutagen' ],
      description: 'What docker service to build the tap with. Must be on of ( sync || container ). Same as passing options "--attached sync "',
      example: 'keg ${ type } --service container',
      default: 'mutagen'
    }
  }, overrides)
}

module.exports = {
  serviceOptions
}