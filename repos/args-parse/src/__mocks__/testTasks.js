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
  },
  testTask3: {
    options: {
      number: {
        description: "Is a number",
        type: 'number',
      },
      num: {
        description: "Is a number",
        type: 'num',
      },
      object: {
        description: "Is an object",
        type: 'Object',
      },
      obj: {
        description: "Is an object",
        type: 'Obj',
      },
      array: {
        description: "Is an array",
        type: 'array',
      },
      arr: {
        description: "Is an array",
        type: 'arr',
      },
      boolean: {
        description: "Is an boolean",
        type: 'boolean',
      },
      bool: {
        description: "Is an boolean",
        type: 'bool',
      },
    }
  }
}
