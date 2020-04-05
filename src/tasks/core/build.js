/*
  * What buildCore method should do
    1. Build a docker container for keg-core
*/

const buildDocker = () => {
// To run the keg without a tap
/*
  docker run --rm -it \
  -v $PWD/:/keg/keg-core \
  -v $PWD/package.json:/keg/keg-core/package.json \
  -p 10000:10000 \
  keg-core:local /bin/bash
*/

}

const buildCore = (args) => {
  const { command, options, tasks, globalConfig } = args
  `docker build -f ./dev/Dockerfile . -t keg-core:local`
}

module.exports = {
  name: 'build',
  alias: [ 'bld', 'make' ],
  action: buildCore,
  description: `Builds the keg-core docker container`,
  example: 'keg core build <options>'
}