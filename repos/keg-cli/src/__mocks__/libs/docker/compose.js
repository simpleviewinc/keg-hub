
const asENV = item => ('${' + item +  '}')

const proxyLabels = (type, proxyHost) => {
  return `      - traefik.http.routers.${type}.rule=Host(\`${proxyHost}\`)
      - traefik.http.routers.${type}.entrypoints=${asENV('KEG_PROXY_ENTRY')}
      - traefik.http.services.${type}.loadbalancer.server.port=${asENV('KEG_PROXY_PORT')}`
}

const kegShared = `      - com.keg.env.cmd=${asENV('KEG_EXEC_CMD')}
      - com.keg.env.port=${asENV('KEG_PROXY_PORT')}
      - com.keg.path.context=${asENV('KEG_CONTEXT_PATH')}
      - com.keg.path.container=${asENV('DOC_APP_PATH')}
      - com.keg.path.compose=${asENV('KEG_COMPOSE_DEFAULT')}
      - com.keg.path.values=${asENV('KEG_VALUES_FILE')}
      - com.keg.path.docker=${asENV('KEG_DOCKER_FILE')}`

const generatedLabels = {
  core: `      - traefik.enable=true
${proxyLabels('core', 'core.${KEG_PROXY_HOST}')}
      - com.keg.env.context=keg-core
${kegShared}
      - com.keg.proxy.domain=core
`,
      components: `      - traefik.enable=true
${proxyLabels('components', 'components.${KEG_PROXY_HOST}')}
      - com.keg.env.context=keg-components
${kegShared}
      - com.keg.proxy.domain=components
`,
      injected: `      - traefik.enable=true
${proxyLabels('injected', 'injected.${KEG_PROXY_HOST}')}
      - com.keg.env.context=tap-injected-test
${kegShared}
      - com.keg.proxy.domain=injected
`
}


module.exports = {
  generatedLabels,
}