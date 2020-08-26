global.testDocker = {
  containers: {
    tap: {
      command: 'docker-entrypoint.s…',
      createdAt: '2020-06-20 01:49:18 -0700 MST',
      id: 'ba9e35cde327',
      image: 'tap',
      labels: '',
      localVolumes: '0',
      mounts: '',
      name: 'tap',
      networks: 'bridge',
      ports: '80/tcp, 443/tcp, 60710/tcp, 0.0.0.0:19002->19002/tcp, 0.0.0.0:80->19006/tcp',
      runningFor: '12 minutes ago',
      size: '0B',
      status: 'Up 16 minutes',
      context: 'tap',
      noPrefix: 'tap'
    },
    core: {
      command: 'docker-entrypoint.s…',
      createdAt: '2020-06-20 01:49:18 -0700 MST',
      id: 'eb9e92ea6354',
      image: 'keg-core',
      labels: '',
      localVolumes: '0',
      mounts: '',
      name: 'img-keg-core',
      networks: 'bridge',
      ports: '80/tcp, 443/tcp, 60710/tcp, 0.0.0.0:19002->19002/tcp, 0.0.0.0:80->19006/tcp',
      runningFor: '16 minutes ago',
      size: '0B',
      status: 'Up 16 minutes',
      context: 'core',
      prefix: 'img-keg-core',
      noPrefix: 'keg-core'
    },
    base: {
      command: 'docker-entrypoint.s…',
      createdAt: '2020-06-25 23:22:34 -0700 MST',
      id: '3ad8d5edbf6c',
      image: 'keg-base',
      labels: '',
      localVolumes: '0',
      mounts: '',
      name: 'package-keg-base',
      networks: 'bridge',
      ports: '80/tcp, 443/tcp, 873/tcp, 8080-8082/tcp, 0.0.0.0:19002->19002/tcp, 19000-19001/tcp, 60710/tcp, 0.0.0.0:19006->19006/tcp',
      runningFor: '27 minutes ago',
      size: '0B',
      status: 'Up 27 minutes',
      context: 'base',
      prefix: 'img-keg-base',
      noPrefix: 'keg-base'
    },
    random: {
      command: 'docker-entrypoint.s…',
      createdAt: '2020-06-25 23:22:34 -0700 MST',
      id: '1caa46fa11ba',
      image: 'random',
      labels: '',
      localVolumes: '0',
      mounts: '',
      name: 'test-random',
      networks: 'bridge',
      ports: '80/tcp, 443/tcp, 873/tcp, 8080-8082/tcp, 0.0.0.0:19002->19002/tcp, 19000-19001/tcp, 60710/tcp, 0.0.0.0:19006->19006/tcp',
      runningFor: '27 minutes ago',
      size: '0B',
      status: 'Up 27 minutes',
      context: 'random',
      prefix: 'test-random',
      noPrefix: 'random'
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
        global.testDocker.containers.random,
        global.testDocker.containers.base,
      ]
    }),
    port: jest.fn((args) => {
      return args.format === 'json'
        ? { '19006': '80' }
        : `19006/tcp -> 0.0.0.0:80`
    }),
    ps: jest.fn((args) => {
      return [
        global.testDocker.containers.core,
        global.testDocker.containers.tap,
        global.testDocker.containers.random,
      ]
    })
  }
}

const dockerOutput = {
  container: {
    list: '{"Command":"\\"docker-entrypoint.s…\\"","CreatedAt":"2020-06-25 17:52:45 -0700 MST","ID":"084a9d7ab5c5","Image":"keg-core:zen-301-fix-multiple-assets-error","Labels":"com.docker.compose.project.config_files=/Users/lancetipton/keg/keg-cli/containers/core/docker-compose.yml,com.docker.compose.project.working_dir=/Users/lancetipton/keg/keg-cli/containers/core,com.docker.compose.service=keg-core,com.docker.compose.version=1.26.0,com.docker.compose.config-hash=a39a94914640a3d7482bd8241b80707bd7bf0dcebace814c8c003ba0afeeb505,com.docker.compose.container-number=1,com.docker.compose.oneoff=False,com.docker.compose.project=core","LocalVolumes":"0","Mounts":"","Names":"package-keg-core-zen-301-fix-multiple-assets-error","Networks":"bridge","Ports":"80/tcp, 443/tcp, 19002/tcp, 60710/tcp, 0.0.0.0:80-\u003e19006/tcp","RunningFor":"57 minutes ago","Size":"0B","Status":"Up 57 minutes"}\n{"Command":"\\"docker-entrypoint.s…\\"","CreatedAt":"2020-06-25 17:52:45 -0700 MST","ID":"084a9d7ab5c5","Image":"keg-core:zen-301-fix-multiple-assets-error","Labels":"com.docker.compose.project.config_files=/Users/lancetipton/keg/keg-cli/containers/core/docker-compose.yml,com.docker.compose.project.working_dir=/Users/lancetipton/keg/keg-cli/containers/core,com.docker.compose.service=keg-core,com.docker.compose.version=1.26.0,com.docker.compose.config-hash=a39a94914640a3d7482bd8241b80707bd7bf0dcebace814c8c003ba0afeeb505,com.docker.compose.container-number=1,com.docker.compose.oneoff=False,com.docker.compose.project=core","LocalVolumes":"0","Mounts":"","Names":"package-keg-core-zen-301-fix-multiple-assets-error","Networks":"bridge","Ports":"80/tcp, 443/tcp, 19002/tcp, 60710/tcp, 0.0.0.0:80-\u003e19006/tcp","RunningFor":"57 minutes ago","Size":"0B","Status":"Up 57 minutes"}',
  },
  image: {
    list: `{"Containers":"N/A","CreatedAt":"2020-06-25 16:25:31 -0700 MST","CreatedSince":"2 hours ago","Digest":"\u003cnone\u003e","ID":"054ad4eab1a5","Repository":"keg-core","SharedSize":"N/A","Size":"833MB","Tag":"0.0.1","UniqueSize":"N/A","VirtualSize":"832.9MB"}\n{"Containers":"N/A","CreatedAt":"2020-06-25 16:25:31 -0700 MST","CreatedSince":"2 hours ago","Digest":"\u003cnone\u003e","ID":"054ad4eab1a5","Repository":"keg-core","SharedSize":"N/A","Size":"833MB","Tag":"latest","UniqueSize":"N/A","VirtualSize":"832.9MB"}\n{"Containers":"N/A","CreatedAt":"2020-06-25 16:21:57 -0700 MST","CreatedSince":"2 hours ago","Digest":"\u003cnone\u003e","ID":"67957d546e40","Repository":"keg-base","SharedSize":"N/A","Size":"408MB","Tag":"0.0.1","UniqueSize":"N/A","VirtualSize":"407.9MB"}\n{"Containers":"N/A","CreatedAt":"2020-06-25 16:21:57 -0700 MST","CreatedSince":"2 hours ago","Digest":"\u003cnone\u003e","ID":"67957d546e40","Repository":"keg-base","SharedSize":"N/A","Size":"408MB","Tag":"latest","UniqueSize":"N/A","VirtualSize":"407.9MB"}\n{"Containers":"N/A","CreatedAt":"2020-06-24 18:34:06 -0700 MST","CreatedSince":"24 hours ago","Digest":"\u003cnone\u003e","ID":"2e038b36c4b0","Repository":"keg-core","SharedSize":"N/A","Size":"841MB","Tag":"zen-301-fix-multiple-assets-error","UniqueSize":"N/A","VirtualSize":"841.3MB"}\n{"Containers":"N/A","CreatedAt":"2020-06-24 18:34:06 -0700 MST","CreatedSince":"24 hours ago","Digest":"\u003cnone\u003e","ID":"2e038b36c4b0","Repository":"docker.pkg.github.com/simpleviewinc/keg-packages/keg-core","SharedSize":"N/A","Size":"841MB","Tag":"zen-301-fix-multiple-assets-error","UniqueSize":"N/A","VirtualSize":"841.3MB"}`
  }

}

module.exports = {
  docker,
  dockerOutput
}