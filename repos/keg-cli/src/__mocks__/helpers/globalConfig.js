const path = require('path')

const homeDir = require('os').homedir()
const cliRoot = path.join(__dirname, '../../../')

module.exports = {
  version: '1.0.0',
  name: 'keg-cli',
  displayName: 'Keg CLI',
  docker: {
    providerUrl: 'docker.pkg.github.com',
    user: 'testuser',
    token: ''
  },
  cli: {
    git: {
      orgName: 'simpleviewinc',
      orgUrl: 'https://github.com/simpleviewinc',
      repos: {
        cli: 'keg-cli',
        core: 'keg-core',
        components: 'keg-components',
        retheme: 're-theme',
        base: 'keg-core',
        resolver: 'tap-resolver',
        proxy: 'keg-proxy'
      },
      sshKey: path.join(homeDir, '.ssh/github'),
      key: '123456789'
    },
    paths: {
      cli: path.join(homeDir, '/keg-hub/repos/keg-cli'),
      components: path.join(homeDir, '/keg-hub/repos/keg-components'),
      containers: path.join(homeDir, '/keg-hub/repos/keg-cli/containers'),
      core: path.join(homeDir, '/keg-hub/repos/keg-core'),
      keg: path.join(homeDir, '/keg'),
      proxy: path.join(homeDir, '/keg-hub/repos/keg-proxy'),
      resolver: path.join(homeDir, '/keg-hub/repos/tap-resolver'),
      retheme: path.join(homeDir, '/keg-hub/repos/re-theme'),
      customTasks: ''
    },
    settings: {
      docker: {
        preConfirm: false,
        buildKit: true,
        defaultLocalBuild: true,
      },
      git: {
        secure: false
      },
      editorCmd: 'code',
      errorStack: false
    },
    taps: {
      links: {
        test: path.join(cliRoot, 'src/__mocks__/tap'),
      }
    }
  }
}