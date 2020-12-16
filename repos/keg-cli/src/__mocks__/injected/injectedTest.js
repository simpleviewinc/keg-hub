const homeDir = require('os').homedir();

const injectedTest = {
  params: {
    tap: 'tap-injected-test',
    env: 'development',
    serviceName: 'tap-injected-test',
    context: 'tap-injected-test',
    __injected: {
      image: 'tap-injected-test',
      container: 'tap-injected-test',
      serviceName: 'tap-injected-test',
      tap: 'tap-injected-test',
      context: 'tap-injected-test',
      valuesPath: `${homeDir}/keg-hub/taps/tap-injected-test/container/values.yml`,
      dockerPath: `${homeDir}/keg-hub/taps/tap-injected-test/container/Dockerfile`,
      mutagenPath: `${homeDir}/keg-hub/taps/tap-injected-test/container/mutagen.yml`,
      composePath: `${homeDir}/keg-hub/taps/tap-injected-test/container/docker-compose.yml`,
      containerPath: `${homeDir}/keg-hub/taps/tap-injected-test/container`,
      injectPath: `${homeDir}/keg-hub/taps/tap-injected-test`,
      location: `${homeDir}/keg-hub/taps/tap-injected-test/container`,
    },
    container: 'tap-injected-test',
    valuesPath: `${homeDir}/keg-hub/taps/tap-injected-test/container/values.yml`,
    dockerPath: `${homeDir}/keg-hub/taps/tap-injected-test/container/Dockerfile`,
    mutagenPath: `${homeDir}/keg-hub/taps/tap-injected-test/container/mutagen.yml`,
    composePath: `${homeDir}/keg-hub/taps/tap-injected-test/container/docker-compose.yml`,
    containerPath: `${homeDir}/keg-hub/taps/tap-injected-test/container`,
    injectPath: `${homeDir}/keg-hub/taps/tap-injected-test`,
    location: `${homeDir}/keg-hub/taps/tap-injected-test/container`,
  },
  cmd: 'up',
  cmdContext: 'tap-injected-test',
  contextEnvs: {
    KEG_COMPOSE_SERVICE: 'tap-injected-test',
    DOCKER_HOST: 'unix:///var/run/docker.sock',
    KEG_DOCKER_IP: '0.0.0.0',
    KEG_DOCKER_BROADCAST: '0.0.0.0',
    KEG_DOCKER_SUBNET_MASK: '255.255.255.0',
    KEG_DOCKER_NAME: 'docker-keg',
    KEG_PATH: `${homeDir}/keg-hub`,
    CLI_PATH: `${homeDir}/keg-hub/repos/keg-cli`,
    CORE_PATH: `${homeDir}/keg-hub/repos/keg-core`,
    CONTAINERS_PATH: `${homeDir}/keg-hub/repos/keg-cli/containers`,
    COMPONENTS_PATH: `${homeDir}/keg-hub/repos/keg-components`,
    KEG_CONFIG_PATH: '',
    RESOLVER_PATH: `${homeDir}/keg-hub/repos/tap-resolver`,
    PROXY_PATH: `${homeDir}/keg-hub/repos/keg-proxy`,
    JSUTILS_PATH: `${homeDir}/keg-hub/repos/jsutils`,
    EXPO_CLI_VERSION: '3.28.5',
    GIT_KEY: 'INITIAL',
    GIT_HUB_URL: 'https://github.com/simpleviewinc/keg-hub.git',
    GIT_HUB_BRANCH: 'develop',
    KEG_BASE_IMAGE: 'docker.pkg.github.com/simpleviewinc/keg-packages/keg-base:develop',
    KEG_NODE_VERSION: '14.14.0',
    DOC_CLI_PATH: '/keg/keg-cli',
    DOC_CORE_PATH: '/keg/tap/node_modules/keg-core',
    DOC_COMPONENTS_PATH: '/keg/tap/node_modules/keg-core/node_modules/@keg-hub/keg-components',
    DOC_RESOLVER_PATH: '/keg/tap/node_modules/keg-core/node_modules/@keg-hub/tap-resolver',
    DOC_APP_PATH: '/keg/tap',
    KEG_CONTEXT_PATH: `${homeDir}/keg-hub/taps/tap-injected-test`,
    KEG_CONTAINER_PATH: `${homeDir}/keg-hub/taps/tap-injected-test/container`,
    KEG_MUTAGEN_FILE: `${homeDir}/keg-hub/taps/tap-injected-test/container/mutagen.yml`,
    KEG_DOCKER_FILE: `${homeDir}/keg-hub/taps/tap-injected-test/container/Dockerfile`,
    KEG_VALUES_FILE: `${homeDir}/keg-hub/taps/tap-injected-test/container/values.yml`,
    KEG_COMPOSE_DEFAULT: `${homeDir}/keg-hub/taps/tap-injected-test/container/docker-compose.yml`,
    DOC_RETHEME_PATH: '/keg/tap/node_modules/keg-core/node_modules/@keg-hub/re-theme',
    DOC_JSUTILS_PATH: '/keg/tap/node_modules/keg-core/node_modules/@keg-hub/jsutils',
    KEG_PROXY_PORT: 19006,
    API_PORT: 5005,
    KEG_PROXY_HOST: 'tap-injected-test.local.kegdev.xyz',
    KEG_PROXY_ENTRY: 'keg',
    KEG_EXEC_CMD: 'dev',
    IMAGE: 'tap-injected-test',
    CONTAINER_NAME: 'keg-herkin',
    VERSION: '0.0.1',
    DOCKER_BUILDKIT: 1,
    COMPOSE_DOCKER_CLI_BUILD: 1,
    PUBLIC_GIT_KEY: 'N/A',
    NODE_ENV: 'development',
    KEG_COPY_LOCAL: true,
  }
}

const injectedContainer = {
  ARGS: {
    GIT_KEY: 'GIT_KEY',
  },
  DEFAULTS: {
    clean: true,
    connect: true,
    entrypoint: false,
    file: true,
    nocache: false,
  },
  VALUES: {
    file: `-f ${ injectedTest.contextEnvs.KEG_DOCKER_FILE }`,
    clean: '--rm',
    nocache: '--no-cache',
    entrypoint: '--entrypoint',
    connect: '-it'
  },
  ENV: injectedTest.contextEnvs,
  BUILD_ARGS_FILTER: [],
}

module.exports = {
  injectedTest,
  injectedContainer
}