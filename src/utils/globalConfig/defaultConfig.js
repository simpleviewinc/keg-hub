const path = require('path')
const { deepMerge } = require('@ltipton/jsutils')
const { CLI_ROOT, GLOBAL_CONFIG_FOLDER } = require('KegConst/constants')
const packageJson = require('KegRoot/package.json')
const cliJson = require('KegRoot/scripts/setup/cli.config.json')

const cliParent = path.join(CLI_ROOT, '../')

const defPaths = {
  keg: cliParent,
  cli: CLI_ROOT,
  kegConfig: GLOBAL_CONFIG_FOLDER,
  containers: path.join(CLI_ROOT, 'containers'),
  components: path.join(cliParent, 'keg-components'),
  core: path.join(cliParent, 'keg-core'),
  proxy: path.join(cliParent, 'keg-proxy'),
  resolver: path.join(cliParent, 'tap-resolver'),
  retheme: path.join(cliParent, 're-theme'),
}

/**
 * Builds the keg repo paths on the local machine
 * @param {Object} paths - Custom paths to keg repos
 *
 * @returns {Object} - Custom paths to repos joined with defaults
 */
const buildInstallPaths = (paths={}) => {
  return Object.keys(defPaths)
    .reduce((usePaths, key) => {
      return key === 'cli' || key === `keg`
        ? usePaths
        : { ...usePaths, [key]: paths[key] || defPaths[key] }
    }, {})
}

/**
 * Builds the default global config from the package.json and the cli.json
 * Merges the two together, and returns it
 *
 * @returns {Object} - Default global config
 */
const defaultConfig = (args={}) => {
  const { paths={} } = args

  const usePaths = buildInstallPaths(paths)
  
  
  const config = {
    version: packageJson.version,
    name: packageJson.name,
    displayName: "Keg CLI",
    docker: {
      providerUrl: "docker.pkg.github.com",
      user: "",
      token: ""
    },
    cli: {
      git: {
        orgName: 'simpleviewinc',
        orgUrl: "https://github.com/simpleviewinc",
        repos: {
          cli: "keg-cli",
          core: "keg-core",
          components: "keg-components",
          retheme: "re-theme",
          resolver: "tap-resolver",
        }
      },
      paths: usePaths,
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
  defPaths,
}