const kegLabels = [
  [
    'image',
    ['params.image', 'contextEnvs.IMAGE'],
    'com.keg.env.context={{ image }}'
  ],
  [
    'KEG_EXEC_CMD',
    'contextEnvs.KEG_EXEC_CMD',
    'com.keg.env.cmd=${KEG_EXEC_CMD}'
  ],
  [
    'KEG_PROXY_PORT',
    'contextEnvs.KEG_PROXY_PORT',
    'com.keg.env.port=${KEG_PROXY_PORT}'
  ],
  [
    'KEG_CONTEXT_PATH',
    'contextEnvs.KEG_CONTEXT_PATH',
    'com.keg.path.context=${KEG_CONTEXT_PATH}'
  ],
  [
    'DOC_APP_PATH',
    'contextEnvs.DOC_APP_PATH',
    'com.keg.path.container=${DOC_APP_PATH}'
  ],
  [
    'KEG_COMPOSE_DEFAULT',
    'contextEnvs.KEG_COMPOSE_DEFAULT',
    'com.keg.path.compose=${KEG_COMPOSE_DEFAULT}'
  ],
  [
    'KEG_VALUES_FILE',
    'contextEnvs.KEG_VALUES_FILE',
    'com.keg.path.values=${KEG_VALUES_FILE}'
  ],
  [
    'KEG_DOCKER_FILE',
    'contextEnvs.KEG_DOCKER_FILE',
    'com.keg.path.docker=${KEG_DOCKER_FILE}'
  ],
  [
    'KEG_PROXY_DOMAIN',
    'proxyDomain',
    'com.keg.proxy.domain={{ proxyDomain }}'
  ],
]

const proxyLabels = [
  [
    '',
    '',
    'traefik.enable=true',
  ],
  [
    'KEG_PROXY_HOST',
    'contextEnvs.KEG_PROXY_HOST',
    'traefik.http.routers.{{ proxyDomain }}.rule=Host(`{{ proxyDomain }}.${KEG_PROXY_HOST}`)',
  ],
  [
    'KEG_PROXY_ENTRY',
    'contextEnvs.KEG_PROXY_ENTRY',
    'traefik.http.routers.{{ proxyDomain }}.entrypoints=${KEG_PROXY_ENTRY}'
  ],
  [
    'KEG_PROXY_PORT',
    'contextEnvs.KEG_PROXY_PORT',
    'traefik.http.services.{{ proxyDomain }}.loadbalancer.server.port=${KEG_PROXY_PORT}'
  ]
]

const kegLabelKeys = kegLabels.reduce((map, meta) => {
  const key = meta[2].split('=').shift()
  map[key.replace(/\./g, '_').toUpperCase().replace('COM_', '')] = key

  return map
}, {})

module.exports = {
  kegLabels,
  kegLabelKeys,
  proxyLabels,
}