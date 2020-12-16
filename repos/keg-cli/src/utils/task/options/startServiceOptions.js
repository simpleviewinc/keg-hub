const { deepMerge } = require('@keg-hub/jsutils')

/**
 * Builds the options for the compose service
 * @param {Object} task - Name of the task calling the compose service
 * @param {Object} action - Name of the action calling the compose service
 *
 * @returns {Object} - Options for tasks using the compose service
 */
const startServiceOptions = (task='', action='') => {
  return {
    build: {
      description: 'Removes and rebuilds the docker container before running keg-components',
      example: `keg ${ task } ${ action } --build`,
      default: false,
    },
    cache: {
      description: 'Docker will use build cache when building the image',
      default: true,
      example: `keg ${ task } ${ action } --no-cache`,
    },
    pull: {
      alias: [ 'pl' ],
      description: `Pull an image from a docker provider. Must be a 'boolean' or name of an image. Uses 'from' option or KEG_IMAGE_FROM env when value is a boolean`,
      example: `keg ${ task } ${ action } --no-pull`,
      default: true
    },
    from: {
      description: 'Image to use as the FROM directive when building. Overwrites KEG_IMAGE_FROM env when set. KEG_IMAGE_FROM env must be set as the FROM value in the Dockerfile.',
      example: `keg ${ task } ${ action } --from tap:production`,
    },
    command: {
      alias: [ 'cmd' ],
      description: 'Overwrites the default yarn command. Command must exist in package.json scripts!',
      example: `keg ${ task } ${ action } --command ios ( Runs "yarn ios" )`,
    },
    destroy: {
      alias: [ 'des' ],
      description: 'All collateral items will be destroyed if the task fails ( true )',
      example: `keg ${ task } ${ action } --no-destroy`,
      default: true
    },
    docker: {
      alias: [ 'doc' ],
      description: `Extra docker arguments to pass to the 'docker run command'`,
      example: `keg ${ task } ${ action } --docker "-e MY_EXTRA_ENV=foo"`,
    },
    satisfy: {
      alias: [ 'sat', 'ensure' ],
      description: 'Will check if required docker images are pulled and built. Will then pull and build images as needed',
      example: `keg ${ task } ${ action } --satisfy false`,
      default: true,
    },
    follow: {
      alias: [ 'f', 'tail', 't' ],
      description: 'Automatically follow the log output of the started service. Not valid for tasks the automatically attach to the container',
      example: `keg ${ task } ${ action } --follow false`,
      default: true
    },
    install: {
      description: 'Install node_modules ( yarn install ) in the container before starting the app. Only valid for tasks that run a docker container.',
      example: `keg ${ task } ${ action } --install`,
      default: false
    },
    log: {
      alias: [ 'lg' ],
      description: 'Prints log information as the task runs',
      example: `keg ${ task } ${ action } --log`,
      default: false,
    },
    local: {
      description: 'Copy the local repo into the docker container at build time. Dockerfile must support KEG_COPY_LOCAL env. Overrides globalConfig setting!',
      example: `keg ${task} ${ action } --local`,
    },
    mounts: {
      description: `List of key names or folder paths to mount into the docker container. Only used when service === 'container'`,
      example: `keg ${ task } ${ action } --mounts cli,components`,
    },
    sync: {
      alias: [ 'syncs', 'sy' ],
      type: 'array',
      description: 'List of key names or folder paths to sync through mutagen into the docker container.',
      example: `keg ${ task } ${ action } --sync cli,components`,
    },
    detach: {
      alias: [ 'detached' ],
      description: `Run the ${ task } ${ action } in detached mode. The process will be started in the background, and not take control of the active terminal.`,
      example: `keg ${ task } ${ action } --detach`,
    },
    service: {
      allowed: [ 'compose', 'container', 'mutagen' ],
      description: 'What docker service to build with. Must be on of ( sync || container || mutagen ). Same as passing options "--attached sync"',
      example: `keg ${ task } ${ action } --service container`,
      default: 'mutagen'
    }
  }
}

module.exports = {
  startServiceOptions
}