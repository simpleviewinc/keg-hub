
const paramsTest = args => {
  // console.log(`---------- Keg CLI Test Params Parsing ----------`)
  // console.log(args.params)
}


/**
 * Validate task for keg-cli
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const validateCli = args => {
  const { command, globalConfig, options, params, tasks } = args
  console.log(`---------- Keg-CLI Validate ----------`)
  console.log(params)

}

module.exports = {
  validate: {
    name: 'validate',
    alias: [ 'val', 'test' ],
    action: validateCli,
    description: `Validate the keg-cli is setup correctly!`,
    example: 'keg global validate',
    tasks: {
      params: {
        name: 'params',
        alias: [ 'par', 'p' ],
        description: 'Test params parsing',
        example: 'keg global test params <options>',
        action: paramsTest,
        options: {
          context: {
            description: 'Context of name of the item to test',
            example: 'keg global test params --context core',
          },
          test: {
            description: 'Test param option',
            example: 'keg global test params --test my-test',
          },
          tap: {
            description: 'Name of the tap when context option value is "tap"',
            example: 'keg global test params --context tap --tap events-force',
          }
        }
      }
    },
    options: {
      foo: {
        description: 'Is foo bar',
      },
      fax: {
        alias: ['zip'],
        allowed: ['buzz', 'bizz'],
        description: 'Is fax bar',
      },
      boo: {
        description: 'Sounds from casper',
        required: true,
        default: 'Boooooo',
        ask: {
          message: 'What sound does casper make?',
          default: 'OoOoOoO',
        }
      },
      do: {
        allowed: [ 'one', 'two' ],
        description: 'Things to do!'
      }
    }
  }
}