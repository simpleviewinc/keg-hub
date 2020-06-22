const docker = require('KegDocCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { isStr, get, isFunc, isArr } = require('jsutils')
const { buildContainerContext } = require('KegUtils/builders/buildContainerContext')
const { throwRequired, generalError } = require('KegUtils/error')
const { runInternalTask } = require('KegUtils/task/runInternalTask')

/**
 * Gets the author to use for the docker commit command
 * @function
 * @param {Object} globalConfig - Kec CLI global config object
 * @param {string} author - Name of author passed from the command line
 *
 * @returns {*} - Response from the docker raw method
 */
const getAuthor = (globalConfig, author) => {
  return author || get(globalConfig, 'docker.user', get(globalConfig, 'cli.git.user'))
}

/**
 * Removes a docker item
 * @function
 * @param {string} item - Docker item to remove
 * @param {string} location - to run the docker cmd
 * @param {Object} ENVs - envs to add the the env for the command
 *
 * @returns {*} - Response from the docker raw method
 */
const rmDockerItem = (item, type='container') => {
  return docker.raw(`${ type } rm ${ item }`.trim())
}

/**
 * Builds a tar command to be run in the docker container
 * @function
 * @example
 * Pack => tar -czf /tmp/keg.gz /keg/keg-core
 * Unpack => tar -xf /tmp/keg.gz -C /keg/keg-core
 * @param {string} from - the tar file to be referenced
 * @param {string} to - the Path the from tar file relates to
 * @param {boolean} unpack - If the tar command should unpack the from tar file
 * @param {boolean} log - IF the tar command output should be logged
 *
 * @returns {string} - Built tar command
 */
const buildTarCmd = ({ from, to, unpack, log }) => {
  to = isArr(to) ? to.join(' ') : to

  const tarArgs = unpack ? `-xf` : `-czf`
  const packArgs = unpack ? ` -C ` : ` `

  return `tar ${ tarArgs }${ log ? 'v' : '' } ${ from }${ packArgs }${ to }`.trim()
}

/**
 * Builds the tar commands to be run durning the package task
 * @function
 * @param {string} to - the Path the from tar file relates to
 * @param {boolean} unpack - If the tar command should unpack the from tar file
 *
 * @returns {Object} - Container the tar file path, and the pack / unpack tar commands 
 */
const getTarCmds = (to, log) => {
  const from = `/tmp/keg.gz`
  // const tarCmd = `tar -czf ${ tarPath } ${ contextEnvs.DOC_APP_PATH }`
  const tarCmd = buildTarCmd({ from, to, log })
  
  // const unTarCmd = `tar -xf ${ tarPath } -C ${ contextEnvs.DOC_APP_PATH }`
  const unTarCmd = buildTarCmd({ from, to, log, unpack: true })

  return { tarPath: from, tarCmd, unTarCmd }
}

/**
 * Packages a docker container to be deployed to a docker providerCan 
 * @function
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.task - The current task being run
 * @param {Object} args.params - Formatted options as an object
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {Object} - Build image as a json object
 */
const dockerPackage = async args => {

  const { params, globalConfig, task } = args
  const { author, context, cmd, log, message, options, push, tag='' } = params

  // Ensure we have a content to build the container
  !context && throwRequired(task, 'context', task.options.context)

  // Get the context data for the command to be run
  const { cmdContext, contextEnvs, location, tap, image } = await buildContainerContext({
    globalConfig,
    task,
    params,
  })

  const useAuthor = getAuthor(globalConfig, author)
  const tempContainer = `${ image }-package`
  const imgTag = `${image}:${ Date.now() }`
  const pushTag = tag || 'package-' + Date.now()
  const finalTag = `${image}:${ pushTag }`
  
  const { tarPath, tarCmd, unTarCmd } = getTarCmds(contextEnvs.DOC_APP_PATH, log)

  /*
  * ----------- Step 1 ----------- *
  * Copy /keg/< image name > folder to a tar within the running container
  * Use the tar command to tar the folder
  */

  Logger.info(`  Creating package in container "${ image }" ...`)

  await docker.container.exec(
    { cmd: tarCmd, container: image, opts: [ '-it' ]},
    { options: { env: contextEnvs } },
    location
  )

  Logger.info(`  Finished creating tar package in container!`)


  /*
  * ----------- Step 2 ----------- *
  * Create image of the container using docker commit
  * Docker commit command creates a new image of a running container
  */
  
  Logger.info(`  Creating temp image of package with tag "${ imgTag }" ...`)

  await docker.container.commit({
    container: image,
    message: message,
    author: useAuthor,
    tag: imgTag,
  })

  Logger.info(`  Finished creating temp image!`)


  /*
  * ----------- Step 3 ----------- *
  * Run new image and copy tar back to original /keg location
  */

  Logger.info(`  Checking it temp container exists ...`)

  /*
  * Before we create the new container, check if the container exists and then remove it
  */
  const exists = await docker.container.exists(
    tempContainer,
    container => container.name === tempContainer,
    'json'
  )

  exists && Logger.info(`  Found temp container, removing ...`)
  exists && await rmDockerItem(tempContainer, location, contextEnvs)

  /*
  * Run the container and unpack tar back to the original location with out the volumes mounted
  */
  
  Logger.info(`  Creating temp container from temp image "${ imgTag }" and unpacking tar ...`)
  
  await docker.image.run({
    image,
    location,
    tag: imgTag,
    cmd: unTarCmd,
    envs: contextEnvs,
    name: tempContainer,
    opts: [ `-it` ],
  })

  Logger.info(`  Finished creating temp container and unpacking tar!`)


  /*
  * ----------- Step 4 ----------- *
  * Create a new commit of the container created above which includes the un-packed tar
  */

  Logger.info(`  Creating final image with tag "${ finalTag }" ...`)

  await docker.container.commit({
    container: tempContainer,
    message: message,
    author: useAuthor,
    tag: finalTag,
  })

  Logger.info(`  Finished creating final image with tag "${ finalTag }"!`)


  /*
  * ----------- Step 5 ----------- *
  * Clean up the temp container and images
  */

  Logger.info(`  Cleaning up temp docker items ...`)

  // Remove the temp container i.e. => *-package
  await rmDockerItem(tempContainer)
  // Remove the temp image i.e. => image tagged with 'imgTag ( Date.now() )' argument
  await rmDockerItem(imgTag, 'image')

  Logger.success(`  Finished docker package command. Created image "${ finalTag }"!`)


  /*
  * ----------- Step 6 ----------- *
  * Push docker image to docker provider registry
  */

  Logger.info(`  Pushing image "${ finalTag }" to provider ...`)

  push && await runInternalTask(
    'tasks.docker.tasks.provider.tasks.push',
    {
      ...args,
      command: 'push',
      params: {
        ...args.params,
        image,
        build: false,
        tag: pushTag,
      }
    }
  )

  Logger.success(`  Finished pushing docker image "${ finalTag }" to provider!`)

}

module.exports = {
  package: {
    name: 'package',
    alias: [ 'dpg', 'pack', 'pk' ],
    action: dockerPackage,
    description: `Packages a docker container for deploying to a docker provider`,
    example: 'keg docker package <options>',
    location_context: DOCKER.LOCATION_CONTEXT.REPO,
    tasks: {
      ...require('./run'),
    },
    options: {
      context: {
        alias: [ 'name' ],
        allowed: DOCKER.IMAGES,
        description: 'Context of the docker container to build',
        example: 'keg docker package --context core',
        enforced: true,
      },
      log: {
        description: 'Log the output the of commands',
        default: false,
      },
      push: {
        description: 'Push the packaged image up to a docker provider registry',
        required: true,
        ask: {
          type: 'confirm',
          message: "Do you want to push to your docker provider?",
          default: false,
        },
      },
      tag: {
        alias: [ 'c' ],
        description: 'Extra tags to add to the docker image after its build. Uses commas (,) to separate',
        example: 'keg docker package tags=my-tag,local,development',
        required: true,
        ask: {
          message: "Enter a tag for the packaged image?",
          default: Date.now(),
        }
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
        example: 'keg docker package --context tap --tap visitapps',
      },
    }
  }
}
