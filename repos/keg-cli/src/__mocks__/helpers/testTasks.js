
const Tasks = {}

Tasks.basic = {
  name: 'basic',
  alias: [ 'bst' ],
  action: async args => (args),
  description: 'Basic test task',
  example: 'keg test basic',
  options: {}
}

const getTask = (name='basic') => (Tasks[name])

module.exports = {
  getTask
}