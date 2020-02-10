
// Checks the passed in element is a react component based on the symbol
const isReactComp = (element, checkContext) => {
  expect(typeof element['$$typeof']).toBe('symbol')
  expect(element['$$typeof'].toString()).toBe('Symbol(react.element)')
  checkContext && 
    expect(element.type._context['$$typeof'].toString())
    .toBe('Symbol(react.context)')
}

// Some generic dimension data for testing
const dimensionData = { window: { width: 0, height: 0, scale: 1, fontScale: 1 } }

export {
  isReactComp,
  dimensionData
}
