const Str = require('../')

describe('template', () => {

  beforeEach(() => jest.resetAllMocks())

  it('should replace the placeholder values', () => {

    const template = '${ who } in ${ where }'
    const data = { who: 'goats', where: 'boats' }

    expect(Str.template(template, data)).toEqual("goats in boats")

  })

  it('should use the fallback when the value does not exist', () => {

    const template = '${ who } in ${ where }'
    const data = { who: 'goats' }
    const fallback = 'coats'

    expect(Str.template(template, data, fallback)).toEqual("goats in coats")

  })

  it('should work with deeply nested values', () => {

    const template = '${ animals.0.farm.type } live in the ${ location }'
    const data = { animals: [ { farm: { type: 'goats'} } ], location: 'boondocks' }
    const fallback = 'city'

    expect(Str.template(template, data, fallback)).toEqual("goats live in the boondocks")

  })

  it('should remove the placeholder if no replacement or fallback', () => {

    const template = '${ animals.0.farm.type } live in the ${ location }'
    const data = { animals: [ { farm: { type: 'goats'} } ]}

    expect(Str.template(template, data)).toEqual("goats live in the ")

  })

  it('should return the template if its not a string', () => {

    const t1 = []
    expect(Str.template(t1, {})).toEqual(t1)

    const t2 = false
    expect(Str.template(t2, {})).toEqual(t2)

    const t3 = 1337
    expect(Str.template(t3, {})).toEqual(t3)

    const t4 = {}
    expect(Str.template(t4, {})).toEqual(t4)

  })

  it('should use the fallback or remove when second argument is not a collection', () => {

    const template = '${ animals.0.farm.type } live in the ${ location }'
    const data = "I am not a collection!"
    const fallback = "test"

    expect(Str.template(template, data)).toEqual(" live in the ")
    expect(Str.template(template, data, fallback)).toEqual("test live in the test")

  })

  it('should log error when first argument is not a string', () => {

    const oldErr = console.error
    console.error = jest.fn()
    Str.template(false)

    expect(console.error).toHaveBeenCalled()

    console.error = oldErr

  })

  it('should allow overriding the default regex', () => {

    const template = '{{animals.0.farm.type}} live in the {{ location }}'
    const data = { animals: [ { farm: { type: 'goats'} } ], location: 'boondocks' }

    Str.template.regex = /{{([^}]*)}}/g
    expect(Str.template(template, data)).toEqual("goats live in the boondocks")

  })

})
