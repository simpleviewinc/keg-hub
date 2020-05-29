const path = require('path')
const { CLI_ROOT } = require('KegConst/constants')
const packageJson = require('KegRoot/package.json')
const { deepMerge } = require('jsutils')
const cliParent = path.join(CLI_ROOT, '../')
const cliJson = require('KegRoot/configs/cli.json')

// TODO: Add script to ask user for values when first setting up cli.config.json
//  - Need git user name
//  - Could also set git token at this point

/**
 * Builds the default global config from the package.json and the cli.json
 * Merges the two together, and returns it
 *
 * @returns {Object} - Default global config
 */
const defaultConfig = () => {
  const config = {
    version: packageJson.version,
    name: packageJson.name,
    displayName: "Keg CLI",
    docker: {
      provider: "docker.pkg.github.com",
      user: "",
      token: ""
    },
    cli: {
      git: {
        orgUrl: "https://github.com/simpleviewinc",
        repos: {
          cli: "keg-cli",
          core: "keg-core",
          components: "keg-components",
          retheme: "re-theme"
        }
      },
      paths: {
        cli: CLI_ROOT,
        components: path.join(cliParent, 'keg-components'),
        containers: path.join(CLI_ROOT, 'containers'),
        core: path.join(cliParent, 'keg-core'),
        keg: cliParent,
        proxy: path.join(cliParent, 'keg-proxy'),
        resolver: path.join(cliParent, 'tap-resolver'),
        retheme: path.join(cliParent, 're-theme'),
      },
      settings: {
        docker: { preConfirm: false },
        git: { secure: false },
        editorCmd: "code"
      },
      taps: { links: {} },
    }
  }

  return deepMerge(config, cliJson)
}


module.exports = {
  defaultConfig,
}