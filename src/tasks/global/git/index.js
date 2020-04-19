module.exports = {
  git: {
    name: 'git',
    description: 'Run git commands on keg and tap repos!',
    example: 'keg git <options>',
    tasks: {
      ...require('./branch'),
      ...require('./commit'),
      ...require('./key'),
      ...require('./pull'),
      ...require('./push'),
    }
  }
}