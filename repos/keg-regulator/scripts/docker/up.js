#!/usr/bin/env node

const { argsParse } = require("argsParse")
const { compose, runCmd } = require("./docker")

// TODO: Add options to task for a location argument
// This should be the path of the features / steps / reports folders to be mounted
// Then need to pass in these envs:
// - KEG_FEATURES_PATH - Set the features path
// - KEG_STEPS_PATH - Set the steps path
// - KEG_REPORTS_PATH - Set the reports path
const buildEnvs = location => {
  // Add the KEG_*_PATH envs here based on the passed in location
  return {}
}

const composeUp = async (args) => {
  const { params } = args
  const { build, cli, env, location, vnc } = params

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
      example: '--build false',
      default: true
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
