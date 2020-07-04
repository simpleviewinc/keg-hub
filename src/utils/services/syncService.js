const { get } = require('@ltipton/jsutils')
const docker = require('KegDocCli')
const { DOCKER } = require('KegConst/docker')
const { Logger } = require('KegLog')
const { getGitPath } = require('../git/getGitPath')
const { getContext } = require('../getters/getContext')
const { runInternalTask } = require('../task/runInternalTask')
const { generalError } = require('../error/generalError')

const getRemotePath = (context, dependency, remote) => {
  return remote || get(
    DOCKER,
    `CONTAINERS.${ context.toUpperCase() }.ENV.DOC_${ dependency.toUpperCase() }_PATH`
  )

}

const getLocalPath = (globalConfig, context, local, dependency) => {
  return local || get(
    DOCKER,
    `CONTAINERS.${ context.toUpperCase() }.ENV.${ dependency.toUpperCase() }_PATH`,
    getGitPath(globalConfig, dependency)
  )
}

const syncService = async (args, params) => {
  const { globalConfig } = args
  const { dependency, local, remote } = params
  
  const containerContext = await getContext({ container: params.container }, true)
  const { context, id } = containerContext
  containerContext.cmdContext = context

  const contextPath = getGitPath(globalConfig, context)

  const localPath = getLocalPath(globalConfig, context, local, dependency)
  !localPath && generalError(`Local path could not be found!`)

  contextPath === localPath && generalError(`Invalid dependency path. The dependency path can not be the same as the context path.\nContext Path: ${ contextPath }\nDependency Path: ${ localPath }`)

  const remotePath = getRemotePath(context, dependency, remote)

  // Create the mutagen sync
  return runInternalTask('mutagen.tasks.create', {
    ...args,
    ...(containerContext && { __internal: { containerContext, skipExists: true } }),
    params: {
      context,
      container: id,
      local: localPath,
      remote: remotePath,
      name: `${context}-${ dependency || remotePath.split('/').pop().replace('-', '').replace('_', '') }`
    },
  })


  // TODO: after creating the sync,
  // Should connect to the container
  // Run yarn install, then ( yarn start | dev)
  

}

module.exports = {
  syncService
}