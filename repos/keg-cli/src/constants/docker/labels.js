const kegLabels = [
  [
    'image',
    ['params.image', 'contextEnvs.IMAGE'],
    ['com.keg.env.context={{ image }}']
  ],
  [
    'KEG_EXEC_CMD',
    'contextEnvs.KEG_EXEC_CMD',
    ['com.keg.env.cmd=${KEG_EXEC_CMD}']
  ],
  [
    'KEG_PROXY_PORT',
    'contextEnvs.KEG_PROXY_PORT',
    ['com.keg.env.port=${KEG_PROXY_PORT}']
  ],
  [
    'KEG_COMPOSE_SERVICE',
    'contextEnvs.KEG_COMPOSE_SERVICE',
    ['com.keg.env.service=${KEG_COMPOSE_SERVICE}']
  ],
  [
    'KEG_CONTEXT_PATH',
    'contextEnvs.KEG_CONTEXT_PATH',
    ['com.keg.path.context=${KEG_CONTEXT_PATH}']
  ],
  [
    'DOC_APP_PATH',
    'contextEnvs.DOC_APP_PATH',
    ['com.keg.path.container=${DOC_APP_PATH}']
  ],
  [
    'KEG_COMPOSE_DEFAULT',
    'contextEnvs.KEG_COMPOSE_DEFAULT',
    ['com.keg.path.compose=${KEG_COMPOSE_DEFAULT}']
  ],
  [
    'KEG_VALUES_FILE',
    'contextEnvs.KEG_VALUES_FILE',
    ['com.keg.path.values=${KEG_VALUES_FILE}']
  ],
  [
    'KEG_DOCKER_FILE',
    'contextEnvs.KEG_DOCKER_FILE',
    ['com.keg.path.docker=${KEG_DOCKER_FILE}']
  ],
]

const proxyLabels = [
  [
    'KEG_PROXY_HOST',
    'contextEnvs.KEG_PROXY_HOST',
    [
      'traefik.enable=true', 
      'traefik.http.routers.{{ params.context }}.rule=Host(`${KEG_PROXY_HOST}`)',
    ]
  ],
  [
    'KEG_PROXY_ENTRY',
    'contextEnvs.KEG_PROXY_ENTRY',
    ['traefik.http.routers.{{ params.context }}.entrypoints=${KEG_PROXY_ENTRY}']
  ],
  [
    'KEG_PROXY_PORT',
    'contextEnvs.KEG_PROXY_PORT',
    ['traefik.http.services.{{ params.context }}.loadbalancer.server.port=${KEG_PROXY_PORT}',]
  ],
]

module.exports = {
  kegLabels,
  proxyLabels,
}