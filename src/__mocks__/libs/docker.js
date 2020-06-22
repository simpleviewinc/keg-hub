global.testDocker = {
  containers: {
    core: {
      command: 'docker-entrypoint.s…',
      createdAt: '2020-06-20 01:49:18 -0700 MST',
      id: 'eb9e92ea6354',
      image: 'kegcore',
      labels: '',
      localVolumes: '0',
      mounts: '',
      name: 'img-kegcore',
      networks: 'bridge',
      ports: '80/tcp, 443/tcp, 60710/tcp, 0.0.0.0:19002->19002/tcp, 0.0.0.0:80->19006/tcp',
      runningFor: '16 minutes ago',
      size: '0B',
      status: 'Up 16 minutes',
      context: 'core',
      prefix: 'img-kegcore'
    }
  }
}

const docker = {
  container: {
    get: jest.fn(() => {
      return global.testDocker.containers.core
    }),
    list: jest.fn(() => {
      return [
        global.testDocker.containers.core, 
      ]
    }),
  }
}

module.exports = {
  docker
}