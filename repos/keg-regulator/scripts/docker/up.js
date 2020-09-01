#!/usr/bin/env node

const path = require("path")
const fs = require("fs")
const { argsParse } = require("@svkeg/args-parse")
const { compose, runCmd } = require("./docker")


const getLocationPath = (location, type, ENV) => {
  const fullPath = location ? path.join(location, type) : ENV

  return Boolean(fs.statSync(fullPath).isDirectory())
    ? fullPath
    : (() => {
        throw new Error(`Error loading path for type ${type}. Location ${fullPath} is not a directory!`)
      })()
}

// TODO: Add options to task for a location argument
// This should be the path of the features / steps / reports folders to be mounted
// Then need to pass in these envs:
// - KEG_FEATURES_PATH - Set the features path
// - KEG_STEPS_PATH - Set the steps path
// - KEG_REPORTS_PATH - Set the reports path
const buildEnvs = location => {
  let { KEG_FEATURES_PATH, KEG_STEPS_PATH, KEG_REPORTS_PATH } = process.env
  
  return {
    KEG_FEATURES_PATH: getLocationPath(location, 'features', KEG_FEATURES_PATH),
    KEG_STEPS_PATH: getLocationPath(location, 'steps', KEG_STEPS_PATH),
    KEG_REPORTS_PATH: getLocationPath(location, 'reports', KEG_REPORTS_PATH),
  }

}

const composeUp = async (args) => {
  const { params } = args
  const { build, env, location, vnc } = params

  await compose([
    '-f',
    'container/docker-compose.yml',
    '-f',
    `container/docker-compose.${ vnc ? 'vnc' : 'headless' }.yml`,
    ...(env === 'development' && [ '-f', 'container/docker-compose.volumes.yml' ] || []),
    'up',
    '-d',
    '--remove-orphans',
    ...(build && [ '--build' ] || []),
  ], buildEnvs(location))
  
  // TODO: After starting keg-regulator, connect to it's CLI
  // Add task to auto run the tests when cli argument is false
  await runCmd('yarn', [ 'docker:cli' ])
}

const startTask = {
  name: 'start',
  action: composeUp,
  example: 'yarn start',
  description : 'Runs docker-compose up command using compose files based on passed in arguments',
  options: {
    vnc: {
      description: 'Run keg-regulator with vnc support to allow viewing tests within a browser',
      example: '--vnc',
      default: false
    },
    build: {
      description: 'Auto builds the docker containers when the command is run',
      example: '--build',
      default: false
    },
    cli: {
      description: 'Runs the keg-regulator CLI',
      example: '--cli false',
      default: true
    },
    location: {
      description: 'Sets the location of the BDD test folders to be mounted',
      example: '--location /path/to/my/tests',
    }
  }
}

module.parent
  ? (module.exports = { start: startTask })
  : (async () => {
      const params = await argsParse({
        task: startTask,
        args: process.argv.slice(2)
      })
      await composeUp({ params })
    })()
