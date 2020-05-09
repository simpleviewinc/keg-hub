const { DOCKER } = require('KegConst/docker')

const getContext = (globalConfig, context) => {
  const cmdContext = DOCKER.BUILD[context.toUpperCase()]
  
  console.log(`---------- cmdContext ----------`)
  console.log(cmdContext)
  
  // CONTEXT_PATH,
  // CONTEXT_DOCKER_FILE
}


module.exports = {
  getContext
}