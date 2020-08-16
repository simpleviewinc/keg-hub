module.exports = {
  testTask1: {
    options: {
      doo: {
        description: "dew the doo",
        require: true,
      },
      foo: {
        alias: [ 'zoo' ],
        description: 'I am foo bar',
        default: 'bar'
      },
      baz: {
        description: 'The baz with bas',
      },
    }
  },
  testTask2: {
    options: {
      context: {
        description: "context of the task",
        require: true,
      },
      tap: {
        description: "Name of the tap",
        ask: 'Please enter the name of the tap?',
      },
    }
  }
}
