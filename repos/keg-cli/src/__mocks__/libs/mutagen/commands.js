const listStrOutput = `--------------------------------------------------------------------------------
Name: core
Identifier: sync_ChWoyx1p7svg5k3k1dIn4IDeuDZMBXDIfaqZuVZuAdi
Labels: None
Alpha:
	URL: /Users/lancetipton/keg/keg-core
	Connection state: Connected
Beta:
	URL: docker://89081a36b44d/keg/keg-core
		DOCKER_HOST=tcp://192.168.99.101:2376
		DOCKER_TLS_VERIFY=1
		DOCKER_CERT_PATH=/Users/lancetipton/.docker/machine/machines/docker-keg
		DOCKER_API_VERSION=
	Connection state: Connected
Status: Watching for changes
--------------------------------------------------------------------------------
Name: components
Identifier: sync_2XhtW6uXucBNGAhRysF6iJDHqFOTKH9nRej02T5FSrf
Labels: None
Alpha:
	URL: /Users/lancetipton/keg/keg-components
	Connection state: Connected
Beta:
	URL: docker://89081a36b44d/keg/keg-core/node_modules/@keg-hub/keg-components
		DOCKER_HOST=tcp://192.168.99.101:2376
		DOCKER_TLS_VERIFY=1
		DOCKER_CERT_PATH=/Users/lancetipton/.docker/machine/machines/docker-keg
		DOCKER_API_VERSION=
	Connection state: Connected
Status: Watching for changes
--------------------------------------------------------------------------------`

const listObjOutput = [
  {
    name: 'core',
    identifier: 'sync_ChWoyx1p7svg5k3k1dIn4IDeuDZMBXDIfaqZuVZuAdi',
    labels: 'None',
    alpha: {
      url: '/Users/lancetipton/keg/keg-core',
      connectionState: 'Connected'
    },
    beta: {
      url: 'docker://89081a36b44d/keg/keg-core',
      dockerHost: 'tcp://192.168.99.101:2376',
      dockerTlsVerify: '1',
      dockerCertPath: '/Users/lancetipton/.docker/machine/machines/docker-keg',
      connectionState: 'Connected'
    },
    status: 'Watching for changes'
  },
  {
    name: 'components',
    identifier: 'sync_2XhtW6uXucBNGAhRysF6iJDHqFOTKH9nRej02T5FSrf',
    labels: 'None',
    alpha: {
      url: '/Users/lancetipton/keg/keg-components',
      connectionState: 'Connected'
    },
    beta: {
      url: 'docker://89081a36b44d/keg/keg-core/node_modules/@keg-hub/keg-components',
      dockerHost: 'tcp://192.168.99.101:2376',
      dockerTlsVerify: '1',
      dockerCertPath: '/Users/lancetipton/.docker/machine/machines/docker-keg',
      connectionState: 'Connected'
    },
    status: 'Watching for changes'
  }
]

const createStr = `mutagen sync create --name=components --default-file-mode=0644 --default-directory-mode=0755 --sync-mode=two-way-resolved --ignore-vcs --ignore=/node_modules --ignore=/core/base/assets/* --ignore=/.* --ignore=!/.storybook --ignore=*.lock --ignore=*.md --ignore=/temp --ignore=/web-build --ignore=/reports --ignore=/build --ignore=/docs /Users/lancetipton/keg/keg-components docker://89081a36b44d/keg/keg-core/node_modules/@keg-hub/keg-components`

const listResponse = jest.fn(async (args) => {
  return { error: null, data: listStrOutput }
})

// TODO: add proper response based on the command call
const raw = jest.fn( async () => {
  return ''
})

const commands = {
  listResponse,
  raw,
}

module.exports = {
  commands,
}
