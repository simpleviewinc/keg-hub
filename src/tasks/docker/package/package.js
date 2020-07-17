const { ask } = require('askIt')
const docker = require('KegDocCli')
const { git } = require('KegGitCli')
const { Logger } = require('KegLog')
const { DOCKER } = require('KegConst/docker')
const { isStr, get, isFunc, isArr, checkCall } = require('@ltipton/jsutils')
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
 * Gets the current branch to use as the commit tag of the image
 * @function
 * @param {string} location - Local path of the repo to get the current branch from
 *
 * @returns {string} - Name of the current branch
 */
const getCommitTag = async location => {
  const currentBr = await git.branch.current(location)
  return currentBr && currentBr.name
}

/**
 * Checks if an image already exists with the passed in tag
 * <br/> If it does, asks user if they want to remove it
 * @function
 * @param {string} imgTag - Image name plus the commit tag
 * @param {string} commitTag - Tag to use when creating the image
 *
 * @returns {boolean} - false is the image does not already exist
 */
const checkImgExists = async (imgTag, commitTag) => {
  const exists = await docker.image.getByTag(commitTag)
  if(!exists) return

  Logger.empty()
  Logger.highlight(`Image`,`"${ imgTag }"`, `already exists.`)
  Logger.empty()

  const replace = await ask.confirm(`Would you like to replace it?`)
  replace && await docker.image.remove({ item: exists.id, force: true })

  // Return the opposite of replace because we want to know if the image exist
  // If not replace, then the image still exists
  return !replace

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
  const { cmdContext, contextEnvs, location, tap, image, id } = await buildContainerContext({
    globalConfig,
    task,
    params,
  })

  const useAuthor = getAuthor(globalConfig, author)

  const currentBranch = tag || await getCommitTag(location)
  const commitTag = (currentBranch || 'package-' + Date.now()).toLowerCase()
  const imgTag = `${ image }:${ commitTag }`.toLowerCase()

  const exists = await checkImgExists(imgTag, commitTag)

  /*
  * Create image of the container using docker commit
  * Docker commit command creates a new image of a running container
  */
  ;exists
    ? Logger.highlight(`Skipping image commit!`)
    : await checkCall(async () => {
        Logger.highlight(`Creating image of container with tag`, `"${ imgTag }"`, `...`)
        
        await docker.container.commit({
          container: id,
          message: message,
          author: useAuthor,
          tag: imgTag,
        })

        Logger.info(`  Finished creating image!`)
      })

  /*
  * Push docker image to docker provider registry
  */
  Logger.empty()
  Logger.highlight(`Pushing image`,`"${ imgTag }"`,`to provider ...`)
  Logger.empty()

  push && await runInternalTask(
    'tasks.docker.tasks.provider.tasks.push',
    {
      ...args,
      command: 'push',
      params: {
        ...args.params,
        image,
        build: false,
        tag: commitTag,
      }
    }
  )

  Logger.success(`  Finished pushing docker image "${ imgTag }" to provider!`)
  Logger.empty()

  return true

}

module.exports = {
  package: {
    name: 'package',
    alias: [ 'dpg', 'pack', 'pk' ],
    action: dockerPackage,
    description: `Packages a docker container for deploying to a docker provider`,
    example: 'keg docker package <options>',
    locationContext: DOCKER.LOCATION_CONTEXT.REPO,
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
        alias: [ 'tg' ],
        description: 'Tag for the image create for the package. Defaults to the current branch of the passed in context',
        example: 'keg docker package tag=my-tag',
      },
      tap: {
        description: 'Name of the tap to build. Only needed if "context" argument is "tap"',
        example: 'keg docker package --context tap --tap visitapps',
      },
    }
  }
}
