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
  }
}
