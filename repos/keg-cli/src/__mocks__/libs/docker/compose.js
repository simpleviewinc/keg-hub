
const asENV = item => ('${' + item +  '}')

const proxyLabels = (type) => {
  return `      - traefik.http.routers.${type}.rule=Host(${ '\`${KEG_PROXY_HOST}\`' })
      - traefik.http.routers.${type}.entrypoints=${asENV('KEG_PROXY_ENTRY')}
      - traefik.http.services.${type}.loadbalancer.server.port=${asENV('KEG_PROXY_PORT')}`
}

const kegShared = `      - com.keg.env.port=${asENV('DOC_APP_PORT')}
      - com.keg.path.context=${asENV('KEG_CONTEXT_PATH')}
      - com.keg.path.container=${asENV('DOC_APP_PATH')}
      - com.keg.path.compose=${asENV('KEG_COMPOSE_DEFAULT')}
      - com.keg.path.values=${asENV('KEG_VALUES_FILE')}
      - com.keg.path.docker=${asENV('KEG_DOCKER_FILE')}`

const generatedLabels = {
  core: `      - traefik.enable=true
${proxyLabels('core')}
      - com.keg.env.context=keg-core
${kegShared}
`,
components: `      - traefik.enable=true
${proxyLabels('components')}
      - com.keg.env.context=keg-components
${kegShared}
`,
}


module.exports = {
  generatedLabels,
}