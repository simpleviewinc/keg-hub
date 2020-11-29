const { fromImage, tagVariable } = require('./singleOptions')

const buildOptions = (task, action) => {
  return {
    tags: {
      alias: [ 'tag' ],
      description: 'Extra tags to add to the docker image when its build. Uses commas (,) to separate',
      example: `keg ${task} build tags=my-tag,local,development`,
      type: 'array'
    },
    version: {
      alias: [ 'ver' ],
      description: 'Version to tag the image with. Typically use to match a git repo release version',
      example: `keg ${task} build --version 1.0.0`,
    },
    tagVariable: tagVariable(task, action),
    tagGit: {
      alias: [ 'taggit', 'tgit', 'tagG', 'tagg', 'git', 'tg' ],
      allowed: [ 'branch', 'br', 'commit', 'cm', false ],
      description: 'Tag the image with the current git branch or commit hash of the repo',
      example: `keg ${task} build --git commit`,
      default: false
    },
    tagPackage: {
      alias: [
        'tagpackage',
        'tpackage',
        'tPackage',
        'Package',
        'package',
        'tPack',
        'tpack',
        'pack',
        'tPkg',
        'tpkg',
        'pkg',
        'tpg',
        'pg',
        'tp'
      ],
      description: 'Tag the image with the current version in the repos package.json file',
      example: `keg ${task} build --package`,
      default: false
    },
    from: fromImage(task, action),
    pull: {
      alias: [ 'pl' ],
      description: `Pull the most recent image before building. Must be a 'boolean' or name of an image. Uses 'from' option, KEG_IMAGE_FROM ENV, global config setting, or true when not passed!`,
      example: `keg ${task} build --no-pull`,
      default: true
    },
    cache: {
      description: 'Skip using docker build cache when building the image',
      example: `keg ${task} build --no-cache`,
      default: true
    },
    local: {
      description: 'Copy the local repo into the docker container at build time. Dockerfile must support KEG_COPY_LOCAL env',
      example: `keg ${task} build --no-local`,
      default: true,
    },
    log: {
      description: 'Log docker command',
      example: 'keg ${task} build --log true',
      default: false
    },
    buildArgs: {
      alias: [ 'bargs', 'bArgs', 'args', 'bA', 'ba', 'buildA' ],
      description: `Extra build args as key / value pairs to pass on to the docker build command.`,
      example: `keg ${task} build --buildArgs custom:arg,other:arg`,
      type: 'array',
    }
  }
}

module.exports = {
  buildOptions
}