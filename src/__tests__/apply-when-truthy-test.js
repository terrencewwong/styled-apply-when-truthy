const applyWhenTruthy = require('../apply-when-truthy')

describe('apply-when-truthy', () => {
  test('returns a func that returns an empty string when prop is not truthy', () => {
    const propsToCSS = applyWhenTruthy(
      'someProp',
      _ => 'this should not be returned'
    )
    expect(propsToCSS({ someProp: false })).toBe('')
  })

  test('returns a func that runs when the prop is truthy', () => {
    const propsToCSS = applyWhenTruthy('someProp', _ => `interpolates ${_}`)
    expect(propsToCSS({ someProp: 'hello' })).toBe('interpolates hello')
  })
})
