
const asENV = item => ('${' + item +  '}')

const proxyLabels = (type, port) => {
  return `      - traefik.http.routers.${type}.rule=Host(${ '\`${KEG_PROXY_HOST}\`' })
      - traefik.http.routers.${type}.entrypoints=${asENV('KEG_PROXY_ENTRY')}
      - traefik.http.services.${type}.loadbalancer.server.port=${asENV('KEG_PROXY_PORT')}`
}

const kegShared = `      - com.keg.path.context=${asENV('KEG_CONTEXT_PATH')}
      - com.keg.path.container=${asENV('DOC_APP_PATH')}
      - com.keg.path.compose=${asENV('KEG_COMPOSE_DEFAULT')}
      - com.keg.path.values=${asENV('KEG_VALUES_FILE')}
      - com.keg.path.docker=${asENV('KEG_DOCKER_FILE')}`

const generatedLabels = {
  core: `      - traefik.enable=true
${proxyLabels('core', 19006)}
      - com.keg.env.context=keg-core
      - com.keg.env.cmd=${asENV('KEG_EXEC_CMD')}
      - com.keg.env.port=${asENV('KEG_PROXY_PORT')}
${kegShared}
`,
      components: `      - traefik.enable=true
${proxyLabels('components', 60710)}
      - com.keg.env.context=keg-components
      - com.keg.env.cmd=${asENV('KEG_EXEC_CMD')}
      - com.keg.env.port=${asENV('KEG_PROXY_PORT')}
${kegShared}
`,
      injected: `      - traefik.enable=true
${proxyLabels('tap-injected-test', 19006)}
      - com.keg.env.context=tap-injected-test
      - com.keg.env.cmd=${asENV('KEG_EXEC_CMD')}
      - com.keg.env.port=${asENV('KEG_PROXY_PORT')}
      - com.keg.env.service=${asENV('KEG_COMPOSE_SERVICE')}
${kegShared}
`
}


module.exports = {
  generatedLabels,
}